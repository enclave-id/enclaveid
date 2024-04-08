# 0. Get master secret from AKV

## network

# We need to check that the master secret and the CA match
# as an attacker might have tampered with the CA since MS doesnt
# provide a way to set confidentiality policies on CA certs for now
CA_MD5=$(echo $CA_CERT | openssl x509 -noout -modulus -in /dev/stdin | openssl md5)
SECRET_MD5=$(echo $MASTER_SECRET | openssl rsa -noout -modulus -in /dev/stdin | openssl md5)

if [ "$CA_MD5" != "$SECRET_MD5" ]; then
    echo "CA certificate and master secret do not match"
    exit 1
fi

# 3. Self issue certificates
...

# 4. Set up envoy with the certificates stored in tmpfs
