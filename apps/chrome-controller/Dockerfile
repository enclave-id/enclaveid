FROM node:20.11.1-alpine3.18 as builder

RUN npm install -g pnpm@9.0.3

WORKDIR /kaniko/buildcontext/

RUN pnpx @puppeteer/browsers install chrome@116.0.5793.0

RUN pnpm install
RUN pnpm exec nx run chrome-controller:build

COPY dist/apps/chrome-controller/ /kaniko/dist/apps/chrome-controller/
COPY node_modules/ /kaniko/node_modules/

FROM linuxserver/rdesktop:fedora-icewm

COPY --from=builder /kaniko/node_modules/ /node_modules/
COPY --from=builder /kaniko/dist/apps/chrome-controller/ /chrome-controller/

WORKDIR /

CMD [ "node", "chrome-controller", "&" ]

