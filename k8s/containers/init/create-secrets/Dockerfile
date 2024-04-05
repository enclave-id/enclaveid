FROM mcr.microsoft.com/azure-cli:2.59.0

RUN apk add --no-cache openssl=3.1.4-r5

COPY /workspace/k8s/containers/init/create-secrets/ /
WORKDIR /

ENTRYPOINT ["/entrypoint.sh"]
