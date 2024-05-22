FROM node:20.11.1-alpine3.18

COPY dist/apps/api/ /api

WORKDIR /

ENV HOST=0.0.0.0
ENV PORT=3000

# Pino is not bundling correctly so we need to install it manually
RUN cd api && npm install pino-pretty

CMD [ "node", "api" ]
