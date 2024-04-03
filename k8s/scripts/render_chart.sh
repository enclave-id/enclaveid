#!/bin/bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

if [ "${DEPLOYMENT}" = "microk8s" ]; then
    ENABLE_CONFIDENTIALITY=false
    API_IMAGE_DIGEST=$(skopeo inspect docker://localhost:32000/api:"${RELEASE_NAME}" --tls-verify=false | jq -r .Digest)
elif [ "${DEPLOYMENT}" = "aks" ]; then
    ENABLE_CONFIDENTIALITY=true
else
    echo "Invalid DEPLOYMENT option. Please use 'microk8s' or 'aks'."
    exit 1
fi

# We use the distro's helm version rather than microk8s
helm template "${RELEASE_NAME}" "$SCRIPT_DIR"/../helm \
    --set image.repository="${REGISTRY}"/api \
    --set image.tag="${API_IMAGE_DIGEST}" \
    --set enable_confidentiality=${ENABLE_CONFIDENTIALITY} \
    | ENV="${ENV}" "$SCRIPT_DIR"/split_chart.sh 
