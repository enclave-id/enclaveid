# EnclaveID

Monorepo with the core services. Ideally we move the data pipeline in here as well.

## Architecture

![alt text](docs/architecture.svg)

The deployment happens in two steps. At first the API pod is deployed, which bootstraps the CA and storage keys and stores them in AKV.

The other pods will wait for this process to complete before starting up. The CA will be used to self-issue certificates for their Envoy sidecars, and the storage keys will be used for their encfs sidecars. This is necessary to guarantee confidentiality when writing to storage and network outside of the TCB (in green).

## Development

Because the attestation logic is tightly bound to the infrastructure, we need to match development and production build + deployment environments as closely as possible.

We distinguish 3 different environments in the development cycle:

- `NODE_ENV==="development"` + no cluster: for development and testing of features other than confidentiality (mocked).
- `NODE_ENV==="production"` + microk8s: for development and testing of all features, including confidentiality.
- `NODE_ENV==="production"` + aks: actual production

## Build and deploy

We build the images using Kaniko with the `--reproducible` flag, so that they can be verified.

Once the images are built, their immutable SHA is set in the source code for attestation purposes.

### Local (microk8s)

![alt text](docs/development.svg)

To setup the `microk8s` cluster for local development:

```bash
# Install MicroK8s
sudo snap install microk8s --classic

sudo usermod -a -G microk8s $USER
newgrp microk8s

microk8s status --wait-ready
microk8s enable dns registry dashboard storage helm helm3 metrics-server

# To access the dashboard
microk8s dashboard-proxy
```

Running `make` at the project root will spin up a Kaniko pod for each application that has a `Dockerfile.dev`. The built images will be stored in the local microk8s registry.

### Prod (AKS)

![alt text](docs/production.svg)

## Verification

In order to verify the integrity of the images in the registry you can rerun the Kaniko builds as they are specified in the CI.

You can then pull the images from the registry and verify that the files' SHAs are matching.
