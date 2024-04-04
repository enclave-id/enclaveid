FROM mcr.microsoft.com/azure-cli:2.9.1

RUN apk add --no-cache openssl=3.1.4-r5

COPY ca.conf /ca.conf
COPY entrypoint.sh /entrypoint.sh
COPY key-release-policy.json /key-release-policy.json

ENTRYPOINT ["/entrypoint.sh"]