FROM python:3.10.14

WORKDIR /kaniko/buildcontext/

RUN apt-get update && apt-get install -y pipx
RUN pipx ensurepath
RUN pipx install poetry

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
RUN nvm install 21.4.0

RUN npm install -g pnpm@9.1.1

RUN pnpm i
RUN pnpm exec nx run data-pipeline:install
