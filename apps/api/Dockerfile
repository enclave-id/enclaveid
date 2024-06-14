FROM node:20.11.1-alpine3.18

COPY dist/apps/api/ /api

WORKDIR /

ENV API_HOST=0.0.0.0
ENV API_PORT=3000

# Necessary for Prisma to work
COPY node_modules/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node /.prisma/client/

# This module is external to the bundle
RUN npm install argon2

EXPOSE 3000

CMD [ "node", "api" ]
