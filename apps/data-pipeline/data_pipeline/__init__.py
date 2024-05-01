import warnings

from dagster import Definitions, ExperimentalWarning, load_assets_from_modules

from .assets import old_history, recent_history, takeout
from .resources import mistral_resource, parquet_io_manager, pgvector_resource
from .sensors import users_sensor

warnings.filterwarnings("ignore", category=ExperimentalWarning)

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
)
