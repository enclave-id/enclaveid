#!/bin/bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

# These are set by the GitHub Actions workflow
AZURE_SERVICE_ACCOUNT_NAME="${AZURE_SERVICE_ACCOUNT_NAME:-}"
AZURE_RESOURCE_GROUP="${AZURE_RESOURCE_GROUP:-}"
AZURE_USER_ASSIGNED_IDENTITY_NAME="${AZURE_USER_ASSIGNED_IDENTITY_NAME:-}"

# TODO: these too
AZURE_KEY_NAME="enclaveid-master-secret-${RELEASE_NAME}"

if [ "${DEPLOYMENT}" = "aks" ]; then
  ENABLE_CONFIDENTIALITY="true"
  AZURE_USER_ASSIGNED_CLIENT_ID="$(az identity show --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_USER_ASSIGNED_IDENTITY_NAME}" --query 'clientId' -otsv)" \
  AZURE_MANAGED_IDENTITY="$(az identity show --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_USER_ASSIGNED_IDENTITY_NAME}" --query 'id' -otsv)"
  AZURE_MAA_ENDPOINT="sharedeus2.eus2.attest.azure.net"
  KATA_WORKLOAD_MEASUREMENT=$(az confcom katapolicygen -y "${SCRIPT_DIR}/../renders/kata-configs.yaml" --print-policy | base64 --decode | sha256sum | cut -d' ' -f1)
  REGISTRY="mcr.microsoft.com"
  AZURE_KV_STORE_NAME="enclaveid-prod"
elif [ "${DEPLOYMENT}" = "microk8s" ]; then
  ENABLE_CONFIDENTIALITY="false"
  REGISTRY="localhost:32000"
  AZURE_KV_STORE_NAME="enclaveid-dev"
else
  echo "Invalid DEPLOYMENT option. Please use 'microk8s' or 'aks'."
  exit 1
fi

API_IMAGE_DIGEST=$(skopeo inspect "docker://${REGISTRY}/api:${RELEASE_NAME}" --tls-verify=false | jq -r .Digest)

CREATE_SECRETS_ARGS="{\
  keyName=${AZURE_KEY_NAME},\
  kvStoreName=${AZURE_KV_STORE_NAME},\
  managedIdentity=${AZURE_MANAGED_IDENTITY},\
  enableConfidentiality=${ENABLE_CONFIDENTIALITY},\
  maaEndpoint=${AZURE_MAA_ENDPOINT},\
  workloadMeasurement=${KATA_WORKLOAD_MEASUREMENT},\
}"

# We use the distro's helm rather than microk8s
helm template "${RELEASE_NAME}" "$SCRIPT_DIR"/../helm \
  --set images.api.repository="${REGISTRY}"/api \
  --set images.api.tag="${API_IMAGE_DIGEST}" \
  --set serviceAccount.name="${AZURE_SERVICE_ACCOUNT_NAME}" \
  --set serviceAccount.annotations."azure\.workload\.identity/client-id"="${AZURE_USER_ASSIGNED_CLIENT_ID}" \
  --set initImages.createSecrets.arguments="${CREATE_SECRETS_ARGS}" |
  ENV="${ENV}" "$SCRIPT_DIR"/split_chart.sh
