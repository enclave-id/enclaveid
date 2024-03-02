#!/bin/bash

# Set program variables
prog="enclaveid"

version=$(git describe --tag --dirty || echo "v0.0.0")
image_tag="${prog}:${version}"
image_tar="${prog}-${version}-kaniko.tar"
image_eif="${image_tar%.tar}.eif"

# Determine architecture
ARCH=$(uname -m)
if [ "$ARCH" = "aarch64" ]; then
    ARCH="arm64"
elif [ "$ARCH" = "x86_64" ]; then
    ARCH="amd64"
fi

# Function to build the docker image
build_image() {
    docker run \
        -v "$(pwd)":/workspace \
        gcr.io/kaniko-project/executor:v1.9.2 \
        --reproducible \
        --no-push \
        --tarPath "${image_tar}" \
        --destination "${image_tag}" \
        --build-arg TARGETPLATFORM=linux/${ARCH} \
        --build-arg TARGETOS=linux \
        --build-arg TARGETARCH=${ARCH} \
        --custom-platform linux/${ARCH}
}

# Function to create EIF from TAR
create_eif() {
    docker load -i "${image_tar}"
    nitro-cli build-enclave \
        --docker-uri "${image_tag}" \
        --output-file "${image_eif}"
}

start_proxy() {
    wget -O gvproxy https://github.com/containers/gvisor-tap-vsock/releases/download/v0.7.3/gvproxy-linux-amd64
    chmod +x gvproxy

    killall gvproxy

    ./gvproxy -listen vsock://:1024 -listen unix:///tmp/network.sock & 

    # Wait for the proxy to start
    sleep 3

    # Expose the port
    curl --unix-socket /tmp/network.sock http:/unix/services/forwarder/expose -X POST -d '{"local":":8443","remote":"192.168.127.2:443"}' 
}

# Function to run the enclave
run_enclave() {
    nitro-cli terminate-enclave --all # Terminate already-running enclave

    # Run the enclave
    nitro-cli run-enclave \
        --cpu-count 6 \
        --memory 15258 \
        --eif-path "${image_eif}" \
        --enclave-cid 4 
}

build_image
create_eif
start_proxy
run_enclave