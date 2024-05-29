FROM pytorch/pytorch:2.3.0-cuda12.1-cudnn8-runtime

SHELL ["/bin/bash", "--login","-c"]

WORKDIR /app

# Install ML dependencies
COPY apps/data-pipeline/requirements.ml.txt /app/
RUN pip install --no-cache-dir --extra-index-url https://pypi.nvidia.com -r requirements.ml.txt

# Install prod dependencies
COPY apps/data-pipeline/requirements.prod.txt /app/
RUN pip install --no-cache-dir -r requirements.prod.txt

# Install the root only
COPY dist/apps/data-pipeline/ /app/
RUN pip install --no-deps  *.whl

