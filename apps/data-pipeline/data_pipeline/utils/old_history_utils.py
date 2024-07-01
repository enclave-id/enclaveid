import datetime
import re
from dataclasses import dataclass
from logging import Logger
from typing import TYPE_CHECKING, Any, Dict, List, Optional, Union

import polars as pl
from dagster import get_dagster_logger
from pydantic import BaseModel, Field

from .is_cuda_available import is_cuda_available

if is_cuda_available() or TYPE_CHECKING:
    import torch
    from sentence_transformers import SentenceTransformer
    from transformers import AutoTokenizer, PreTrainedTokenizer, PreTrainedTokenizerFast
    from vllm import LLM, SamplingParams
else:
    torch = None
    SentenceTransformer = None
    LLM = SamplingParams = None
    AutoTokenizer = PreTrainedTokenizer = PreTrainedTokenizerFast = None


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
    tokenizer: Union[PreTrainedTokenizer, PreTrainedTokenizerFast]
    sampling_params: SamplingParams
    chunk_size: int = 15

    def _extract_interests_list(self, text: str) -> Optional[List[str]]:
        match = re.search(r"\[(.*?)\]", text)
        if match:
            # If a match is found, split the substring by semicolon
            interests = match.group(1).replace('"', "").replace("'", "").split(";")
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
        conversations: List[List[Dict[str, str]]] = []

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
                    conversations.append(
                        [
                            {
                                "role": "user",
                                "content": f"{self.first_instruction}\n{frame}",
                            }
                        ]
                    )

        # TODO: How do we print the progress bar?
        first_requests = self.llm.generate(
            self.tokenizer.apply_chat_template(
                conversations,
                tokenize=False,
                add_generation_prompt=True,  # type: ignore
            ),
            self.sampling_params,
        )
        first_responses = [resp.outputs[0].text for resp in first_requests]

        for c, r1 in zip(conversations, first_responses):
            c.append({"role": "assistant", "content": r1})
            c.append({"role": "user", "content": self.second_instruction})

        second_requests = self.llm.generate(
            self.tokenizer.apply_chat_template(
                conversations,
                tokenize=False,
                add_generation_prompt=True,  # type: ignore
            ),
            self.sampling_params,
        )
        second_responses = [resp.outputs[0].text for resp in second_requests]

        for c, r2 in zip(conversations, second_responses):
            c.append({"role": "assistant", "content": r2})

        self.chunked_interests = [
            self._extract_interests_list(resp) for resp in second_responses
        ]

        # Save the convo for each chunk as a single string
        self.chunked_convos = [
            "\n".join([f"{c['role']}: {c['content']}" for c in convo])
            for convo in conversations
        ]

    def generate_output_records(self):
        self._generate_chunks()
        self._generate_chunked_interests()

        for date, chunked_interests, chunked_convos in zip(
            self.dates, self.chunked_interests, self.chunked_convos
        ):
            chunked_interests = chunked_interests or []

            chunked_interests = [interest for interest in chunked_interests if interest]

            yield {
                "date": date,
                "chunked_convos": chunked_convos,
                "interests": chunked_interests,
                "count_invalid_responses": 1 if len(chunked_interests) == 0 else 0,
            }


def get_full_history_sessions(
    daily_dfs: dict[datetime.date, pl.DataFrame],
    chunk_size: int,
    first_instruction: str,
    second_instruction: str,
    ml_model_name: str,
):
    logger = get_dagster_logger()

    logger.info("Loading the model. This may take a few minutes...")
    llm = LLM(model=ml_model_name)
    tokenizer = AutoTokenizer.from_pretrained(ml_model_name)

    # TODO: We could potentially make this part of the Config so the params can be
    # configured from the Dagster UI
    sampling_params = SamplingParams(temperature=0.8, top_p=0.95, max_tokens=1024)

    logger.info(f"Processing {len(daily_dfs)} records")

    interests_generator = InterestsGenerator(
        daily_dfs=daily_dfs,
        first_instruction=first_instruction,
        second_instruction=second_instruction,
        llm=llm,
        tokenizer=tokenizer,
        sampling_params=sampling_params,
        chunk_size=chunk_size,
    )

    daily_records = interests_generator.generate_output_records()

    output_df = (
        pl.DataFrame(daily_records)
        .filter(pl.col("interests").is_not_null())
        .group_by("date")
        .agg(
            [
                pl.col("chunked_convos").str.concat("\n"),
                pl.col("interests").flatten().unique(),
                pl.col("count_invalid_responses").sum(),
            ]
        )
    )

    return FullHistorySessionsOutput(
        output_df=output_df,
        count_invalid_responses=int(output_df["count_invalid_responses"].sum()),
    )


def get_embeddings(series: pl.Series, model: SentenceTransformer):
    embeddings = model.encode(series.to_list(), precision="float32")
    return pl.Series(
        name="embeddings",
        values=embeddings,
        dtype=pl.Array(pl.Float32, model.get_sentence_embedding_dimension()),  # type: ignore
    )
