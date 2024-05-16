FROM nvcr.io/nvidia/rapidsai/base:24.04-cuda12.2-py3.10

# TODO: is there a way to install the wheel with poetry?
# RUN apt-get update && apt-get install -y pipx
# RUN pipx ensurepath
# RUN pipx install poetry

# TODO: copy local dependencies
COPY dist/apps/data-pipeline /app
WORKDIR /app

RUN pip install data_pipeline-1.0.0-py3-none-any.whl
