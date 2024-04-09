#!/bin/bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

LOCAL_REGISTRY="localhost:32000"

API_IMAGE_DIGEST=$(skopeo inspect "docker://${LOCAL_REGISTRY}/api:${RELEASE_NAME}" --tls-verify=false | jq -r .Digest)
CREATE_SECRET_IMAGE_DIGEST=$(skopeo inspect "docker://${LOCAL_REGISTRY}/create-secrets:${RELEASE_NAME}" --tls-verify=false | jq -r .Digest)

echo "API image digest: ${API_IMAGE_DIGEST}"
echo "Create secrets image digest: ${CREATE_SECRET_IMAGE_DIGEST}"

helm template "enclaveid-${ENV}" "$SCRIPT_DIR"/../helm \
  --set images.api.tag="${API_IMAGE_DIGEST}" \
  --set initImages.createSecrets.tag="${CREATE_SECRET_IMAGE_DIGEST}" \
  -f "${SCRIPT_DIR}/../helm/values.yaml" -f "${SCRIPT_DIR}/../helm/values.dev.yaml" |
  ENV="${ENV}" "$SCRIPT_DIR"/split_chart.sh