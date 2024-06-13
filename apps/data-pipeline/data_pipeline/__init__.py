import warnings
from dagster import ExperimentalWarning

# Do not move these after the other imports or they will not work.
warnings.filterwarnings("ignore", category=ExperimentalWarning)
warnings.filterwarnings(
    "ignore",
    message='Field name "extension" in "PolarsParquetIOManager" shadows an attribute in parent "BasePolarsUPathIOManager"',
    category=UserWarning,
)

from dagster import (
    Definitions,
    load_assets_from_modules,
    multi_or_in_process_executor,
)
from dagster_k8s import k8s_job_executor

from data_pipeline.consts import get_environment

from .assets import old_history, recent_history, takeout
from .resources import mistral_resource, parquet_io_manager, pgvector_resource
from .sensors import users_sensor

all_assets = load_assets_from_modules([takeout, recent_history, old_history])

defs = Definitions(
    assets=all_assets,
    sensors=[
        users_sensor,
    ],
    resources={
        "parquet_io_manager": parquet_io_manager,
        "mistral": mistral_resource,
        "pgvector": pgvector_resource,
    },
    executor=(
        k8s_job_executor
        if get_environment() != "LOCAL"
        else multi_or_in_process_executor
    ),
)
