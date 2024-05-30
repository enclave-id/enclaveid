from functools import partial

import numpy as np
import polars as pl
from dagster import AssetExecutionContext, AssetIn, AssetsDefinition, asset
from pydantic import Field

from ..partitions import user_partitions_def
from ..utils.custom_config import RowLimitConfig
from ..utils.is_cuda_available import is_cuda_available
from ..utils.k8s import k8s_gpu_config
from ..utils.old_history_utils import (
    InterestsSpec,
    get_embeddings,
    get_full_history_sessions,
)

if is_cuda_available():
    import cuml
    import cupy as cp
    from cuml.cluster import HDBSCAN
    from cuml.metrics import pairwise_distances
    from sentence_transformers import SentenceTransformer


SUMMARY_PROMPT = (
    "Here is a list of my Google search data. Are there any highly sensitive "
    "psychosocial interests? Summarize the answer as a comma-separated array of "
    "strings. Only include highly sensitive psychosocial data."
)


class InterestsConfig(RowLimitConfig):
    ml_model_name: str = Field(
        default="mistralai/Mistral-7B-Instruct-v0.2",
        description=(
            "The Hugging Face model to use as the LLM. See the vLLMs docs for a "
            "list of the support models:\n"
            "https://docs.vllm.ai/en/latest/models/supported_models.html"
        ),
    )

    chunk_size: int = Field(
        default=15,
        description=(
            "Split the raw history into chunks of this size. We allow vLLM to "
            "determine the ideal batch size by itsef, so this has no impact on "
            "runtime but it still determines how many records are shown to the "
            "LLM at one time. Having too many records can cause the LLM to give "
            "sub-par responses."
        ),
    )


class InterestsEmbeddingsConfig(RowLimitConfig):
    ml_model_name: str = Field(
        default="Salesforce/SFR-Embedding-Mistral",
        description=("The Hugging Face model to use with SentenceTransformers."),
    )

    chunk_size: int = Field(
        default=15,
        description=(
            "Split the raw history into chunks of this size. We allow vLLM to "
            "determine the ideal batch size by itsef, so this has no impact on "
            "runtime but it still determines how many records are shown to the "
            "LLM at one time. Having too many records can cause the LLM to give "
            "sub-par responses."
        ),
    )


def build_interests_assets(spec: InterestsSpec) -> list[AssetsDefinition]:
    """TODO: Implement a tags-based concurrency limit of 1 for GPU assets to
    avoid competition for resources.
    """

    @asset(
        name=spec.name_prefix + "_interests",
        partitions_def=user_partitions_def,
        io_manager_key="parquet_io_manager",
        op_tags=k8s_gpu_config,
    )
    def interests(
        context: AssetExecutionContext,
        config: InterestsConfig,
        full_takeout: pl.DataFrame,
    ) -> pl.DataFrame:
        # Enforce the row_limit (if any) per day and sort the data by time because
        # Polars reads data out-of-order
        full_takeout = full_takeout.slice(0, config.row_limit).sort("timestamp")

        # Split into multiple data frames (one per day). This is necessary to correctly
        # identify the data associated with each time entry.
        daily_dfs = full_takeout.with_columns(
            date=pl.col("timestamp").dt.date()
        ).partition_by("date", as_dict=True, include_key=False)

        sessions_output = get_full_history_sessions(
            daily_dfs=daily_dfs,
            chunk_size=config.chunk_size,
            first_instruction=spec.first_instruction,
            second_instruction=spec.second_instruction,
            logger=context.log,
        )

        context.add_output_metadata(
            {"count_invalid_responses": sessions_output.count_invalid_responses}
        )

        return sessions_output.output_df

    @asset(
        name=spec.name_prefix + "_interests_embeddings",
        partitions_def=user_partitions_def,
        io_manager_key="parquet_io_manager",
        ins={"interests": AssetIn(key=[spec.name_prefix + "_interests"])},
        op_tags=k8s_gpu_config,
    )
    def interests_embeddings(
        context: AssetExecutionContext,
        config: InterestsEmbeddingsConfig,
        interests: pl.DataFrame,
    ) -> pl.DataFrame:
        df = (
            # Enforce row_limit (if any)
            interests.slice(0, config.row_limit)
            .select("date", "interests")
            # Explode the interests so we get the embeddings for each individual interest
            .explode("interests")
        )

        context.log.info("Loading the model. This may take a few minutes...")
        model = SentenceTransformer(config.ml_model_name)

        context.log.info("Computing embeddings")
        return df.with_columns(
            embeddings=pl.col("interests").map_batches(
                partial(get_embeddings, model=model),
            )
        )

    @asset(
        name=spec.name_prefix + "_interests_clusters",
        partitions_def=user_partitions_def,
        io_manager_key="parquet_io_manager",
        ins={
            "interests_embeddings": AssetIn(
                key=[spec.name_prefix + "_interests_embeddings"]
            )
        },
        op_tags=k8s_gpu_config,
    )
    def interests_clusters(
        context: AssetExecutionContext,
        config: RowLimitConfig,
        interests_embeddings: pl.DataFrame,
    ) -> pl.DataFrame:
        # Apply the row limit (if any)
        df = interests_embeddings.slice(0, config.row_limit)

        # Convert the embeddings to a CuPy array
        embeddings_gpu = cp.asarray(df["embeddings"].to_numpy())

        # Reduce the embeddings dimensions
        umap_model = cuml.UMAP(
            n_neighbors=15, n_components=100, min_dist=0.1, metric="cosine"
        )
        reduced_data_gpu = umap_model.fit_transform(embeddings_gpu)

        # TODO: Implement a search across cluster_selection_epsilon to ensure a max
        # of 50 clusters are returned.

        # Compute the pairwise distances between the interests
        cosine_dist = pairwise_distances(reduced_data_gpu, metric="cosine")

        # Make the clusters
        clusterer = HDBSCAN(
            min_cluster_size=5,
            gen_min_span_tree=True,
            metric="precomputed",
            cluster_selection_epsilon=0.02,
        )
        cluster_labels = clusterer.fit_predict(cosine_dist.astype(np.float64).get())

        context.add_output_metadata(
            {
                "num_clusters": len(np.unique(cluster_labels)),
                "cluster_names": np.unique(cluster_labels).tolist(),
            }
        )

        # TODO: Implement logic to extract the top 5 largest clusters, and top 5 clusters
        # by farthest point sampling (most distance from each other -.e., cross-cluster distance)
        return df.with_columns(cluster_label=pl.Series(cluster_labels))

    return [interests, interests_embeddings, interests_clusters]


sensitive_interests_spec = InterestsSpec(
    name_prefix="sensitive",
    first_instruction=(
        "Here is a list of my Google search data. Are there any highly sensitive "
        "psychosocial interests?"
    ),
    second_instruction=(
        "Summarize the previous answer as a comma-separated array of strings. "
        "Only include highly sensitive psychosocial data."
    ),
)

general_interests_spec = InterestsSpec(
    name_prefix="general",
    first_instruction="Here is a list of my Google search data. What interests can you find?",
    second_instruction="Summarize the previous answer as a comma-separated array of strings.",
)

interests_assets = [
    *build_interests_assets(sensitive_interests_spec),
    *build_interests_assets(general_interests_spec),
]
