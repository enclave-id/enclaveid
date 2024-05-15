FROM linuxserver/rdesktop:fedora-icewm

SHELL ["/bin/bash", "--login", "-ec"]

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
RUN nvm install 22

RUN npx @puppeteer/browsers install chrome@116.0.5793.0

WORKDIR /app
COPY dist/apps/chrome-controller/ /app/

CMD [ "node", "chrome-controller", "&" ]
