#!/bin/bash

set -euo pipefail

# See https://github.com/microsoft/confidential-container-demos/blob/main/kafka/setup-key.sh

if [ $# -ne 4 ]; then
  echo "Usage: $0 <KEY_NAME> <KV_STORE_NAME> <MANAGED_IDENTITY> <MAA_ENDPOINT>"
  exit 1
fi

ENABLE_CONFIDENTIALITY="${ENABLE_CONFIDENTIALITY:-false}"
TMPFS_DIR="${TMPFS_DIR:-/tmp}"

cd "$TMPFS_DIR"

KEY_NAME=$1
KV_STORE_NAME=$2
MANAGED_IDENTITY=$3
MAA_ENDPOINT=$4

AZURE_AKV_RESOURCE_ENDPOINT=""

if [[ $ENABLE_CONFIDENTIALITY == "true" ]]; then
  AZURE_AKV_RESOURCE_ENDPOINT="$KV_STORE_NAME.managedhsm.azure.net"
else
  AZURE_AKV_RESOURCE_ENDPOINT="$KV_STORE_NAME.vault.azure.net"
fi

key_vault_name=$(echo "$AZURE_AKV_RESOURCE_ENDPOINT" | cut -d. -f1)
echo "Key vault name is ${key_vault_name}"

if [[ "$AZURE_AKV_RESOURCE_ENDPOINT" == *".vault.azure.net" ]]; then
  if [[ $(az keyvault list -o json | grep "Microsoft.KeyVault/vaults/${key_vault_name}") ]] 2>/dev/null; then
    echo "AKV endpoint OK"
  else
    echo "Azure akv resource endpoint doesn't exist. Please refer to documentation instructions to set it up first:"
    exit 1
  fi
elif [[ "$AZURE_AKV_RESOURCE_ENDPOINT" == *".managedhsm.azure.net" ]]; then
  if [[ $(az keyvault list -o json | grep "Microsoft.KeyVault/managedHSMs/${key_vault_name}") ]] 2>/dev/null; then
    echo "AKV endpoint OK"
  else
    echo "Azure akv resource endpoint doesn't exist. Please refer to documentation instructions to set it up first:"
    exit 1
  fi
fi

policy_file_name="/key-release-policy.json"

if [ "$ENABLE_CONFIDENTIALITY" = "true" ]; then
  if [[ -z "${WORKLOAD_MEASUREMENT}" ]]; then
    echo "Error: Env WORKLOAD_MEASUREMENT is not set. Set this to condition releasing your key on your security policy matching the expected value."
    exit 1
  else
    # Update the policy file with the workload measurement
    jq --arg equalsValue "${WORKLOAD_MEASUREMENT}" '
            .anyOf[] |= (.allOf |= map(if .claim == "x-ms-sevsnpvm-hostdata" then .equals = $equalsValue else . end))
    ' "${policy_file_name}" >tmp.$$.json

    mv tmp.$$.json "${policy_file_name}"

    # Update the policy file with the MAA endpoint
    jq --arg equalsValue "${MAA_ENDPOINT}" '.anyOf[] |= (.authority = $equalsValue)' "${policy_file_name}" >tmp.$$.json

    mv tmp.$$.json "${policy_file_name}"
  fi
else
  echo "Warning: Confidentiality is disabled. Key will be released to any principal."
fi

# Create RSA key directly in Azure Key Vault
if [ "$ENABLE_CONFIDENTIALITY" = "true" ]; then
  az keyvault key create --id https://$AZURE_AKV_RESOURCE_ENDPOINT/keys/${KEY_NAME} --ops \
    wrapKey unwrapKey encrypt decrypt --kty RSA-HSM --size 3072 --exportable \
    --policy ${policy_file_name}
else
  az keyvault key create --id https://$AZURE_AKV_RESOURCE_ENDPOINT/keys/${KEY_NAME} --ops \
    wrapKey unwrapKey encrypt decrypt --kty RSA-HSM --size 3072 --exportable
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
