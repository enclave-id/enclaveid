FROM node:20.11.1-alpine3.18 as builder

RUN npm install -g pnpm@9.0.3

WORKDIR /kaniko/buildcontext/

RUN pnpx @puppeteer/browsers install chrome@116.0.5793.0

RUN pnpm install

RUN pnpm exec nx run chrome-controller:build

FROM linuxserver/rdesktop:fedora-icewm

COPY /kaniko/buildcontext/dist/apps/chrome-controller/ /chrome-controller/
COPY /kaniko/buildcontext/node_modules/ /node_modules/

WORKDIR /

CMD [ "node", "chrome-controller", "&" ]

