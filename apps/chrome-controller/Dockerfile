FROM linuxserver/rdesktop:fedora-xfce

SHELL ["/bin/bash", "-c"]

RUN dnf install -y nodejs

WORKDIR /

RUN npx @puppeteer/browsers install chrome@116.0.5793.0

WORKDIR /config

COPY dist/apps/chrome-controller/ chrome-controller/

# puppeteer-extra-plugin-stealth needs a bunch of assets. Easier to just install it rather than copy them over.
RUN cd chrome-controller && npm i puppeteer-extra-plugin-stealth

# Necessary for Prisma to work
COPY node_modules/prisma/libquery_engine-rhel-openssl-3.0.x.so.node /.prisma/client/

COPY apps/chrome-controller/entrypoint.sh /config/entrypoint.sh
RUN chmod +x /config/entrypoint.sh

CMD ["/config/entrypoint.sh"]
