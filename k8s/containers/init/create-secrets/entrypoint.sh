#!/bin/bash

set -euo pipefail

# See https://github.com/microsoft/confidential-container-demos/blob/main/kafka/setup-key.sh

if [ $# != 2 ] && [ $# != 6 ]; then
  echo "Usage: $0 <KEY_NAME> <KV_STORE_NAME> [<ENABLE_CONFIDENTIALITY>] [<MANAGED_IDENTITY>] [<MAA_ENDPOINT>] [<WORKLOAD_MEASUREMENT>]"
  exit 1
fi

KEY_NAME=$1
KV_STORE_NAME=$2
ENABLE_CONFIDENTIALITY=$3
MANAGED_IDENTITY=$4
MAA_ENDPOINT=$5
WORKLOAD_MEASUREMENT=$6

# We tmpfs to store sensitive data since the disk is not yet encrypted by the sidecar
TMPFS_DIR="/tmp"
cd "$TMPFS_DIR"

AZURE_AKV_RESOURCE_ENDPOINT=""
AZURE_KV_TYPE=""

# In the dev environment, we use the service principal instead of MANAGED_IDENTITY
if [ "$ENABLE_CONFIDENTIALITY" != "true" ]; then
  set -o allexport
  if [ -f /.env ]; then
    source /.env
  fi
  set +o allexport

  if [ -z "$AZURE_CLIENT_ID" ] || [ -z "$AZURE_CLIENT_SECRET" ] || [ -z "$AZURE_TENANT_ID" ]; then
    echo "Azure service principal credentials are not set. Please set them in the /.env file."
    exit 1
  fi

  az login --service-principal -u "$AZURE_CLIENT_ID" -p "$AZURE_CLIENT_SECRET" --tenant "$AZURE_TENANT_ID"

  echo "......Logged in to Azure with dev credentials"
fi

# TODO: Create mHSM and throw away the secrets
# TODO: Check that the retention period == key valdity period AND purge protection is enabled (which is immutable)

if [ "$ENABLE_CONFIDENTIALITY" = "true" ]; then
  AZURE_AKV_RESOURCE_ENDPOINT="$KV_STORE_NAME.managedhsm.azure.net"
  AZURE_KV_TYPE="managedHSM"
else
  AZURE_AKV_RESOURCE_ENDPOINT="$KV_STORE_NAME.vault.azure.net"
  AZURE_KV_TYPE="vault"
fi

key_vault_name=$(echo "$AZURE_AKV_RESOURCE_ENDPOINT" | cut -d. -f1)
echo "Key vault name is ${key_vault_name}"

if [[ $(az keyvault list -o json | grep "Microsoft.KeyVault/${AZURE_KV_TYPE}s/${key_vault_name}") ]] 2>/dev/null; then
  echo "AKV endpoint OK"
else
  echo "Azure akv resource endpoint doesn't exist. Please refer to documentation instructions to set it up first:"
  exit 1
fi

policy_file_name="/key-release-policy.json"

if [ "$ENABLE_CONFIDENTIALITY" = "true" ]; then
  # Update the policy file with the workload measurement
  jq --arg equalsValue "${WORKLOAD_MEASUREMENT}" '
            .anyOf[] |= (.allOf |= map(if .claim == "x-ms-sevsnpvm-hostdata" then .equals = $equalsValue else . end))
    ' "${policy_file_name}" >tmp.$$.json

  mv tmp.$$.json "${policy_file_name}"

  # Update the policy file with the MAA endpoint
  jq --arg equalsValue "${MAA_ENDPOINT}" '.anyOf[] |= (.authority = $equalsValue)' "${policy_file_name}" >tmp.$$.json

  mv tmp.$$.json "${policy_file_name}"
else
  echo "Warning: Confidentiality is disabled. Key will be released to any principal."
fi

# Create RSA key directly in Azure Key Vault
if [ "$ENABLE_CONFIDENTIALITY" = "true" ]; then
  echo "......Creating RSA key in ${AZURE_AKV_RESOURCE_ENDPOINT} with HSM"
  az keyvault key create --id https://$AZURE_AKV_RESOURCE_ENDPOINT/keys/${KEY_NAME} --ops \
    wrapKey unwrapKey encrypt decrypt --kty RSA-HSM --size 3072 --exportable \
    --policy ${policy_file_name}
else
  echo "......Creating RSA key in ${AZURE_AKV_RESOURCE_ENDPOINT} without HSM"
  az keyvault key create --id https://$AZURE_AKV_RESOURCE_ENDPOINT/keys/${KEY_NAME} --ops \
    wrapKey unwrapKey encrypt decrypt --kty RSA --size 3072
fi

echo "......Created RSA key in ${AZURE_AKV_RESOURCE_ENDPOINT}"

# Release the key to the managed identity
az keyvault key release --id https://$AZURE_AKV_RESOURCE_ENDPOINT/keys/${KEY_NAME} --recipient-object-id $MANAGED_IDENTITY
echo "......Released key to managed identity"

# Generate CA from master secret
openssl req -new -x509 -days 3650 -key master-secret.pem -out ca-cert.pem -config /ca.cnf
# Upload CA to AKV
az keyvault secret set --vault-name "$KV_STORE_NAME" --name $CA_CERT_NAME --file your-ca-cert.pem
echo "......Uploaded CA to AKV"
