FROM mcr.microsoft.com/azure-cli:2.59.0

WORKDIR /kaniko/buildcontext/
# TODO: Switch to another distro that doesn't drop old versions of packages
# so that we can pin package versions and make it reproducible
RUN apk add --no-cache openssl gnutls-utils xxd

COPY k8s/containers/init/load-secrets/ /

WORKDIR /

ENTRYPOINT ["/entrypoint.sh"]
