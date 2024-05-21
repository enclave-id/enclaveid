FROM linuxserver/rdesktop:fedora-icewm

SHELL ["/bin/bash", "--login", "-ec"]

WORKDIR /

RUN dnf update -y && dnf install -y nodejs

RUN npx @puppeteer/browsers install chrome@116.0.5793.0
ENV CHROME_BIN=/chrome/linux-116.0.5793.0/chrome-linux64/chrome

COPY dist/apps/chrome-controller/ /chrome-controller/

CMD [ "node", "chrome-controller", "&" ]
