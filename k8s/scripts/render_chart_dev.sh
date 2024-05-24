#!/bin/bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

LOCAL_REGISTRY="localhost:32000"

# TODO: should use release name instead
API_IMAGE_DIGEST=$(skopeo inspect "docker://${LOCAL_REGISTRY}/enclaveid/api:master" --tls-verify=false | jq -r .Digest)
GUACAMOLE_TUNNEL_IMAGE_DIGEST=$(skopeo inspect "docker://${LOCAL_REGISTRY}/enclaveid/guacamole-tunnel:master" --tls-verify=false | jq -r .Digest)

CREATE_SECRETS_IMAGE_DIGEST=$(skopeo inspect "docker://${LOCAL_REGISTRY}/enclaveid/create-secrets:${RELEASE_NAME}" --tls-verify=false | jq -r .Digest)
LOAD_SECRETS_IMAGE_DIGEST=$(skopeo inspect "docker://${LOCAL_REGISTRY}/enclaveid/load-secrets:${RELEASE_NAME}" --tls-verify=false | jq -r .Digest)

helm template enclaveid "$SCRIPT_DIR"/../helm \
  --set containers.api.image="${LOCAL_REGISTRY}/enclaveid/api@${API_IMAGE_DIGEST}" \
  --set containers.guacamoleTunnel.image="${LOCAL_REGISTRY}/enclaveid/guacamole-tunnel@${GUACAMOLE_TUNNEL_IMAGE_DIGEST}" \
  --set initContainers.createSecrets.image="${LOCAL_REGISTRY}/enclaveid/create-secrets@${CREATE_SECRETS_IMAGE_DIGEST}" \
  --set initContainers.loadSecrets.image="${LOCAL_REGISTRY}/enclaveid/load-secrets@${LOAD_SECRETS_IMAGE_DIGEST}" \
  -f "${SCRIPT_DIR}/../helm/values.yaml" -f "${SCRIPT_DIR}/../helm/values.dev.yaml" --debug |
  "$SCRIPT_DIR"/split_chart.sh
