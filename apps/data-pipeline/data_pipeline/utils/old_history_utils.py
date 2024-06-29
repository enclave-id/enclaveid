import datetime
import re
from dataclasses import dataclass
from logging import Logger
from typing import TYPE_CHECKING, Any, Dict, List, Optional

import polars as pl
from pydantic import BaseModel, Field

from .is_cuda_available import is_cuda_available

if is_cuda_available() or TYPE_CHECKING:
    import torch
    from sentence_transformers import SentenceTransformer
    from vllm import LLM, SamplingParams
else:
    torch = None
    SentenceTransformer = None
    LLM = None
    SamplingParams = None


class InterestsSpec(BaseModel):
    name_prefix: str = Field(description="A prefix to add to the name of the asset.")
    first_instruction: str
    second_instruction: str


@dataclass
class FullHistorySessionsOutput:
    output_df: pl.DataFrame
    count_invalid_responses: int


@dataclass
class InterestsGenerator:
    daily_dfs: Dict[datetime.date, pl.DataFrame]
    first_instruction: str
    second_instruction: str
    llm: LLM
    sampling_params: SamplingParams
    chunk_size: int = 15

    def _extract_interests_list(self, text: str) -> Optional[List[str]]:
        match = re.search(r"\[(.*?)\]", text)
        if match:
            # If a match is found, split the substring by comma
            interests = match.group(1).replace('"', "").replace("'", "").split(",")
            return [interest.strip() for interest in interests]
        return None

    def _generate_chunks(self):
        self.chunks: dict[datetime.date, List[pl.DataFrame]] = {}

        for date, day_df in self.daily_dfs.items():
            self.chunks[date] = []
            for slice in day_df.iter_slices(self.chunk_size):
                self.chunks[date].append(slice.select("hour", "title"))

    def _generate_chunked_interests(self):
        """
        TODO: Experiment with prefix caching. See the example below.
        https://github.com/vllm-project/vllm/blob/main/examples/offline_inference_with_prefix.py
        """
        self.dates = []
        first_prompts: list[str] = []

        for date, day_dfs in self.chunks.items():
            for _, frame in enumerate(day_dfs, start=1):
                # Set Polars' string formatting so none of the rows or strings are compressed / cut off.
                max_chars = frame["title"].str.len_chars().max()

                with pl.Config(
                    tbl_formatting="NOTHING",
                    tbl_hide_column_data_types=True,
                    tbl_hide_dataframe_shape=True,
                    fmt_str_lengths=max_chars,
                    tbl_rows=-1,
                ):
                    self.dates.append(date)
                    first_prompts.append(
                        f"<s> [INST] {self.first_instruction}\n\n{frame}\n [/INST]"
                    )

        first_requests = self.llm.generate(first_prompts, self.sampling_params)
        first_responses = [resp.outputs[0].text for resp in first_requests]

        second_prompts: list[str] = []
        for p1, r1 in zip(first_prompts, first_responses):
            second_prompts.append(
                f"{p1} {r1}</s> [INST] {self.second_instruction} [/INST]"
            )

        second_requests = self.llm.generate(second_prompts, self.sampling_params)
        second_responses = [resp.outputs[0].text for resp in second_requests]

        self.chunked_interests = [
            self._extract_interests_list(resp) for resp in second_responses
        ]

        # Save the convo for each chunk as a single string
        self.chunked_convos = []
        for p2, r2 in zip(second_prompts, second_responses):
            self.chunked_convos.append(f"{p2} {r2}</s>")

    def generate_output_records(self):
        self._generate_chunks()
        self._generate_chunked_interests()

        for date, chunked_interests, chunked_convos in zip(
            self.dates, self.chunked_interests, self.chunked_convos
        ):
            # Filter out invalid responses
            valid_chunks = [chunk for chunk in chunked_interests if chunk is not None]

            # Flatten the chunks
            merged_interests = [
                interest for chunk in valid_chunks for interest in chunk
            ]

            yield {
                "date": date,
                "chunked_convos": chunked_convos,
                "chunked_interests": chunked_interests,
                # Different chunks may have the same interests; we only want the
                # distinct interests across all chunks
                "interests": list(set(merged_interests)),
                "count_invalid_responses": (len(chunked_interests) - len(valid_chunks)),
            }


def get_full_history_sessions(
    daily_dfs: dict[datetime.date, pl.DataFrame],
    chunk_size: int,
    first_instruction: str,
    second_instruction: str,
    logger: Logger,
    ml_model_name: str = "mistralai/Mistral-7B-Instruct-v0.2",
):
    logger.info("Loading the model. This may take a few minutes...")
    llm = LLM(model=ml_model_name)

    # TODO: We could potentially make this part of the Config so the params can be
    # configured from the Dagster UI
    sampling_params = SamplingParams(temperature=0.8, top_p=0.95, max_tokens=1024)

    daily_records: list[dict[str, Any]] = []

    logger.info(f"Processing {len(daily_dfs)} records")

    interests_generator = InterestsGenerator(
        daily_dfs=daily_dfs,
        first_instruction=first_instruction,
        second_instruction=second_instruction,
        llm=llm,
        sampling_params=sampling_params,
        chunk_size=chunk_size,
    )

    daily_records = interests_generator.generate_output_records()

    return FullHistorySessionsOutput(
        output_df=pl.from_records(daily_records),
        # Sum the invalid responses across all days
        count_invalid_responses=sum(
            out["count_invalid_responses"] for out in daily_records
        ),
    )


def get_embeddings(series: pl.Series, model: SentenceTransformer):
    embeddings = model.encode(series.to_list(), precision="float32")
    return pl.Series(
        name="embeddings",
        values=embeddings,
        dtype=pl.Array(pl.Float32, model.get_sentence_embedding_dimension()),  # type: ignore
    )
