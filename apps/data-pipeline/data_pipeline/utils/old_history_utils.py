import datetime
import gc
import re
from dataclasses import dataclass
from logging import Logger
from typing import Any

import polars as pl
from pydantic import BaseModel, Field

from .is_cuda_available import is_cuda_available

if is_cuda_available():
    import torch
    from sentence_transformers import SentenceTransformer
    from vllm import LLM, SamplingParams
    from vllm.model_executor.parallel_utils.parallel_state import destroy_model_parallel


class InterestsSpec(BaseModel):
    name_prefix: str = Field(description="A prefix to add to the name of the asset.")
    first_instruction: str
    second_instruction: str


@dataclass
class FullHistorySessionsOutput:
    output_df: pl.DataFrame
    count_invalid_responses: int


@dataclass
class DailyInterestsGenerator:
    date: datetime.date
    df: pl.DataFrame
    first_instruction: str
    second_instruction: str
    llm: LLM
    sampling_params: SamplingParams
    chunk_size: int = 15

    def _extract_interests_list(self, text):
        match = re.search(r"\[(.*?)\]", text)
        if match:
            # If a match is found, split the substring by comma
            interests = match.group(1).replace('"', "").replace("'", "").split(",")
            return [s.strip() for s in interests]
        else:
            return None

    def _generate_chunks(self):
        # Keep only the relevant columns
        filtered_df = self.df.select("hour", "title")

        self.chunks: list[pl.DataFrame] = []
        for frame in filtered_df.iter_slices(n_rows=self.chunk_size):
            self.chunks.append(frame)

    def _generate_chunked_interests(self):
        """
        TODO: We could potentially see a signifcant speedup by processing all
        prompts at the same time, instead of daily, where batch sizes can be
        rather small. This will raise some complexity with respect to mapping
        responses to their date. We could then potentially also compute the
        sensitive and general interests at the same time for a further speedup.

        TODO: Experiment with prefix caching. See the example below.
        https://github.com/vllm-project/vllm/blob/main/examples/offline_inference_with_prefix.py
        """
        first_prompts: list[str] = []
        for idx, frame in enumerate(self.chunks, start=1):
            # Set Polars' string formatting so none of the rows or strings are
            # compressed / cut off.
            max_chars = frame["title"].str.len_chars().max()

            with pl.Config(
                tbl_formatting="NOTHING",
                tbl_hide_column_data_types=True,
                tbl_hide_dataframe_shape=True,
                fmt_str_lengths=max_chars,
                tbl_rows=-1,
            ):
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

    def generate_output_record(self):
        self._generate_chunks()
        self._generate_chunked_interests()

        # Filter out invalid responses
        valid_chunks = [chunk for chunk in self.chunked_interests if chunk is not None]

        # Flatten the chunks
        merged_interests = [interest for chunk in valid_chunks for interest in chunk]

        return {
            "date": self.date,
            "chunked_convos": self.chunked_convos,
            "chunked_interests": self.chunked_interests,
            # Different chunks may have the same interests; we only want the
            # distinct interests across all chunks
            "interests": list(set(merged_interests)),
            "count_invalid_responses": (
                len(self.chunked_interests) - len(valid_chunks)
            ),
        }


def get_full_history_sessions(
    daily_dfs: dict[datetime.date, pl.DataFrame],
    chunk_size: int,
    first_instruction: str,
    second_instruction: str,
    logger: Logger,
    model_name: str = "mistralai/Mistral-7B-Instruct-v0.2",
):
    logger.info("Loading the model. This may take a few minutes...")
    llm = LLM(model=model_name)

    # TODO: We could potentially make this part of the Config so the params can be
    # configured from the Dagster UI
    sampling_params = SamplingParams(temperature=0.8, top_p=0.95, max_tokens=1024)

    daily_records: list[dict[str, Any]] = []
    for idx, (day, day_df) in enumerate(daily_dfs.items(), start=1):
        logger.info(f"Processing {day} ({idx}/{len(daily_dfs)})")
        interests_generator = DailyInterestsGenerator(
            date=day,
            df=day_df,
            first_instruction=first_instruction,
            second_instruction=second_instruction,
            llm=llm,
            sampling_params=sampling_params,
            chunk_size=chunk_size,
        )

        daily_records.append(interests_generator.generate_output_record())

    logger.info("Unloading the LLM and freeing GPU memory.")
    destroy_model_parallel()
    # del llm.llm_engine.driver_worker  # type: ignore
    del llm
    gc.collect()
    torch.cuda.empty_cache()
    torch.distributed.destroy_process_group()

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
