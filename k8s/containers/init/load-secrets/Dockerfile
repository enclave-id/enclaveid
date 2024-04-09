FROM mcr.microsoft.com/azure-cli:2.59.0

RUN apk add --no-cache openssl=3.1.4-r5 gnutls-utils=3.8.4-r0 xxd=9.1.0-r1

COPY /workspace/k8s/containers/init/load-secrets/ /
WORKDIR /

ENTRYPOINT ["/entrypoint.sh"]
