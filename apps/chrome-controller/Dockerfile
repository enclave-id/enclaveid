FROM node:20.11.1-alpine3.18 as builder

RUN npm install -g pnpm@9.0.3

WORKDIR /kaniko/buildcontext/

RUN pnpx @puppeteer/browsers install chrome@116.0.5793.0

RUN pnpm install && pnpm exec nx run chrome-controller:build && \
    cp -r dist/apps/chrome-controller/ /kaniko/dist/apps/chrome-controller/ && \
    cp -r node_modules/ /kaniko/node_modules/

FROM linuxserver/rdesktop:fedora-icewm

COPY --from=builder /kaniko/node_modules/ /node_modules/
COPY --from=builder /kaniko/dist/apps/chrome-controller/ /chrome-controller/

WORKDIR /

CMD [ "node", "chrome-controller", "&" ]

