FROM linuxserver/rdesktop:fedora-xfce

SHELL ["/bin/bash", "-c"]

RUN dnf install -y nodejs

WORKDIR /

RUN npx @puppeteer/browsers install chrome@116.0.5793.0

WORKDIR /config

COPY dist/apps/chrome-controller/ chrome-controller/

RUN cd chrome-controller && npm i puppeteer-extra-plugin-stealth

COPY apps/chrome-controller/entrypoint.sh /config/entrypoint.sh
RUN chmod +x /config/entrypoint.sh

CMD ["/config/entrypoint.sh"]
