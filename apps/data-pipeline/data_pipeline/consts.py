import os
from enum import Enum

from upath import UPath


def get_environment() -> str:
    if os.getenv("DAGSTER_CLOUD_IS_BRANCH_DEPLOYMENT", "") == "1":
        return "BRANCH"
    if os.getenv("DAGSTER_CLOUD_DEPLOYMENT_NAME", "") == "prod":
        return "PROD"
    return "LOCAL"


DEPLOYMENT_TYPE = get_environment()

PRODUCTION_STORAGE_BUCKET: UPath = {
    "LOCAL": UPath(__file__).parent.parent / "data",
    # TODO: Should we also have a staging bucket for user data?
    "BRANCH": UPath("az://enclaveid-production-bucket/"),
    "PROD": UPath("az://enclaveid-production-bucket/"),
}[DEPLOYMENT_TYPE]

DAGSTER_STORAGE_BUCKET = {
    "LOCAL": UPath("/tmp/dagster_data"),
    "BRANCH": UPath("az://enclaveid-dagster-staging-bucket/"),
    "PROD": UPath("az://enclaveid-dagster-prod-bucket/"),
}[DEPLOYMENT_TYPE]

DEPLOYMENT_ROW_LIMIT = {"LOCAL": 100, "BRANCH": 1000, "PROD": None}[DEPLOYMENT_TYPE]


class DataProvider(Enum):
    GOOGLE = "google"
    FACEBOOK = "facebook"
    OPENAI = "openai"
