FROM python:3.10.14-alpine3.19

RUN apk add --no-cache poetry=1.7.1-r1 nodejs=20.12.2-r0

RUN npm install -g pnpm@8.15.4

COPY /workspace /app

WORKDIR /app

RUN pnpm exec nx run data-pipeline:install

# TODO: build, etc...
