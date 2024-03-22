#!/bin/bash

set -e

# Set the release name and namespace as needed
YQ_EXECUTABLE=./yq_linux_amd64
RENDERS_DIR=../dist


# Define an array with the kinds relevant to Kata
KATA_KINDS=("DaemonSet" "Deployment" "Job" "Pod" "ReplicaSet" "ReplicationController" "StatefulSet")

# Initialize empty strings for the yq expressions
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

# Use `yq` to extract resources relevant to Kata configurations
$YQ_EXECUTABLE eval "select($KATA_KINDS_EXPRESSION)" $RENDERS_DIR/all-in-one.yaml > $RENDERS_DIR/kata-configs.yaml

# Filter and save other Kubernetes resources
$YQ_EXECUTABLE eval "select($NOT_KATA_KINDS_EXPRESSION)" $RENDERS_DIR/all-in-one.yaml > $RENDERS_DIR/k8s-configs.yaml
