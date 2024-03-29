#!/bin/bash

set -e

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

YQ_EXECUTABLE="$SCRIPT_DIR/yq_linux_amd64"
RENDERS_DIR="$SCRIPT_DIR/../renders"

# Define an array with the kinds relevant to Kata
KATA_KINDS=("DaemonSet" "Deployment" "Job" "Pod" "ReplicaSet" "ReplicationController" "StatefulSet")

KATA_KINDS_EXPRESSION=""
NOT_KATA_KINDS_EXPRESSION=""

# Build the yq expressions dynamically from the array
for kind in "${KATA_KINDS[@]}"; do
    if [[ -n $KATA_KINDS_EXPRESSION ]]; then
        KATA_KINDS_EXPRESSION+=" or "
        NOT_KATA_KINDS_EXPRESSION+=" and "
    fi
    KATA_KINDS_EXPRESSION+=".kind == \"$kind\""
    NOT_KATA_KINDS_EXPRESSION+=".kind != \"$kind\""
done

# Read stdin into a temporary file
TMP_FILE=$(mktemp)
cat - > "$TMP_FILE"

# Use `yq` to extract resources relevant to Kata configurations
$YQ_EXECUTABLE eval "select($KATA_KINDS_EXPRESSION)" "$TMP_FILE" > "$RENDERS_DIR/kata-configs.yaml"

# Filter and save other Kubernetes resources
$YQ_EXECUTABLE eval "select($NOT_KATA_KINDS_EXPRESSION)" "$TMP_FILE" > "$RENDERS_DIR/k8s-configs.yaml"

rm "$TMP_FILE"