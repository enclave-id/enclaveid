#!/bin/bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

REGISTRY="${REGISTRY:-docker://localhost:32000}"

AZURE_SERVICE_ACCOUNT_NAME="${AZURE_SERVICE_ACCOUNT_NAME:-workload-identity-sa}"

AZURE_RESOURCE_GROUP="${AZURE_RESOURCE_GROUP:-}"
AZURE_USER_ASSIGNED_IDENTITY_NAME="${AZURE_USER_ASSIGNED_IDENTITY_NAME:-}"

if [ "${DEPLOYMENT}" = "microk8s" ]; then
  ENABLE_CONFIDENTIALITY=false
  API_IMAGE_DIGEST=$(skopeo inspect "${REGISTRY}"/api:"${RELEASE_NAME}" --tls-verify=false | jq -r .Digest)
elif [ "${DEPLOYMENT}" = "aks" ]; then
  ENABLE_CONFIDENTIALITY=true
  API_IMAGE_DIGEST=
  AZURE_USER_ASSIGNED_CLIENT_ID="$(az identity show --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_USER_ASSIGNED_IDENTITY_NAME}" --query 'clientId' -otsv)" \
  AZURE_MANAGED_IDENTITY="$(az identity show --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_USER_ASSIGNED_IDENTITY_NAME}" --query 'id' -otsv)"
else
  echo "Invalid DEPLOYMENT option. Please use 'microk8s' or 'aks'."
  exit 1
fi

# We use the distro's helm rather than microk8s
helm template "${RELEASE_NAME}" "$SCRIPT_DIR"/../helm \
  --set image.repository="${REGISTRY}"/api \
  --set image.tag="${API_IMAGE_DIGEST}" \
  --set seserviceAccount.name="${AZURE_SERVICE_ACCOUNT_NAME}" \
  --set serviceAccount.annotations."azure\.workload\.identity/client-id"="${AZURE_USER_ASSIGNED_CLIENT_ID}" \
  --set managed_identity="${AZURE_MANAGED_IDENTITY}" \
  --set enable_confidentiality=${ENABLE_CONFIDENTIALITY} |
  ENV="${ENV}" "$SCRIPT_DIR"/split_chart.sh
