FROM linuxserver/rdesktop:fedora-icewm

RUN dnf install -y nodejs git

RUN npm install -g pnpm@9.0.3

WORKDIR /kaniko/buildcontext/

RUN pnpx @puppeteer/browsers install chrome@116.0.5793.0

RUN pnpm install

RUN pnpm run build:chrome-controller --configuration=development

COPY dist/apps/chrome-controller/ /chrome-controller/
COPY node_modules/ /node_modules/

WORKDIR /

CMD [ "node", "chrome-controller" ]

