FROM node:20.11.1-alpine3.18

COPY dist/apps/api/ /api

WORKDIR /

ENV HOST=0.0.0.0
ENV PORT=3000

COPY node_modules/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node /.prisma/client/

CMD [ "node", "api" ]
