FROM node:20.11.1-alpine3.18

COPY dist/apps/api/ /app/

WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=3000

CMD [ "node", "api" ]
