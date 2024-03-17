# EnclaveID

Monorepo with the core services. Ideally we move the data pipeline in here as well.

## Architecture

![alt text](docs/architecture.svg)

## Build and deploy

Because the attestation logic is tightly bound to the infrastructure, we need to match development and production build + deployment environments as closely as possible.

We build the images using Kaniko with the `--reproducible` flag, so that they can be attested and verified.

### Development

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

### Production

![alt text](docs/production.svg)
