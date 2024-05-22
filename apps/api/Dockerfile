FROM node:20.11.1-alpine3.18

COPY dist/apps/api/ /api

WORKDIR /

ENV HOST=0.0.0.0
ENV PORT=3000
ENV API_DATABASE_URL=postgres://enclaveid:enclaveid@enclaveid-postgresql.default.svc.cluster.local:5432/enclaveid_api

COPY node_modules/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node /.prisma/client/

EXPOSE 3000

CMD [ "node", "api" ]
