#!/bin/bash

# See https://github.com/microsoft/confidential-container-demos/blob/main/kafka/setup-key.sh

# Run this in azure cli container

set -euo pipefail

ENABLE_CONFIDENTIALITY="${ENABLE_CONFIDENTIALITY:-false}"

if ! command -v openssl &> /dev/null; then
    echo "OpenSSL is not installed. Installing it..."
    apk upgrade --update-cache --available
    apk add openssl
fi

# Use tmpfs for storing secrets since we don't want them to be written to unencrypted disk
...

# Generate master secret for storage and network encryption
MASTER_SECRET=$(openssl genrsa 3072)

# Generate CA from master secret
CSR=$(echo $MASTER_SECRET | openssl req -new -key /dev/stdin -config ca.conf)
echo $MASTER_SECRET | openssl req -x509 -days 3650 -key /dev/stdin -in your-ca.csr -out your-ca-cert.pem

# Upload CA to AKV
az keyvault secret set --vault-name $AKV_NAME --name $CA_CERT_NAME --file your-ca-cert.pem

# Upload master secret to AKV with skr policy
az keyvault secret set --vault-name $AKV_NAME --name $MASTER_SECRET_NAME --file <(echo $MASTER_SECRET) --tags skr=true

