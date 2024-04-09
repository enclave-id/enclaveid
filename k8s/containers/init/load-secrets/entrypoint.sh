set -euo pipefail

# We tmpfs to store sensitive data since the disk is not yet encrypted
TMPFS_DIR="/tmp"
cd "$TMPFS_DIR"

if [ "$ENVIRONMENT" = "microk8s" ]; then

  # Copy the secrets from the unencrypted shared storage to tmpfs
  cp /mnt/unencrypted-shared-storage/master-secret.pem ./
  cp /mnt/unencrypted-shared-storage/ca-cert.pem ./

elif
  [ "$ENVIRONMENT" = "aks" ]
then

  echo "Error: Not implemented" #TODO: load secrets from AKV
  exit 1

else
  echo "Unknown environment $ENVIRONMENT. Exiting."
  exit 1
fi

# Derive intermediate secret from master secret
SEED=$(openssl rsa -in master-secret.pem -outform DER | openssl dgst -sha256 -binary | xxd -p | tr -d '\n')
certtool --generate-privkey --key-type=rsa --to-rsa --sec-param=high --seed="$SEED" --provable --outfile intermediate-secret.pem
echo "......Generated intermediate secret"

# We need to check that the intermediate secret and the CA match
# as an attacker might have tampered with the CA since MS doesnt
# provide a way to set confidentiality policies on CA certs for now
CA_MD5=$(openssl x509 -noout -modulus -in ca-cert.pem | openssl md5)
SECRET_MD5=$(openssl rsa -noout -modulus -in intermediate-secret.pem | openssl md5)

if [ "$CA_MD5" != "$SECRET_MD5" ]; then
  echo "CA certificate and master secret do not match"
  exit 1
fi

# Self issue certificates using the CA
openssl req -new -key intermediate-secret.pem -out intermediate.csr -config /ca.cnf
openssl x509 -req -days 3650 -in intermediate.csr -CA ca-cert.pem -CAkey intermediate-secret.pem -CAcreateserial -out tls-cert.pem -extfile ca.cnf -extensions v3_req
echo "......Generated self signed TLS certificate"
