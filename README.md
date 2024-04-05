# EnclaveID

Monorepo with the core services. Ideally we move the data pipeline in here as well.

## Architecture

![alt text](docs/architecture.svg)

First, there are two types of initContainers that run in this sequence:

- `init_secrets`
- `init_envoy`

`init_secrets` populates the secrets in akv (with the skr policy in prod)

`init_envoy` downloads the CA cert and the secret key from AKV, verifies the CA derivation (since MS doesnt support skr for certs yet) and sets up the envoy sidecar with mTLS, only accepting connections within the cluster that have certificates issued by the same CA.

All disk operations in the initContainers are done on `tempfs`, which is in memory and so untamprable bc of SEV-SNP.

The `remotefs` sidecar provided by MS (https://github.com/microsoft/confidential-sidecar-containers/tree/main/cmd/remotefs) mounts a r/w filesystem encrypted using the master secret in AKV.

TODO: fix the arch doc. attestaation sidecar only necessary in APi for remote attestation with client.

## Development

We distinguish 3 different environments in the development cycle:

- `NODE_ENV==="development"` + no cluster: API and frontend development.
- `NODE_ENV==="production"` + microk8s: for development and testing of all features, excluding confidentiality.
- `NODE_ENV==="production"` + aks: actual production, with confidentiality.

K8s fodler structure:

- `build/`: kaniko configs for build stage
- `containers/`: auxiliary containers (initContainers, sidecars)
- `helm/`: helm chart for deployment
- `renders/`: helm chart renders
- `scripts/`: auxiliary scripts to customize the renders

## Build and deploy

To install the requirements:

```
sudo dnf -y install skopeo jq helm
sudo snap install yq
```

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

Running `make` at the project root will spin up a Kaniko pod for each application that has a `Dockerfile`. The built images will be stored in the local microk8s registry.

To render the chart with the newly built images, run `make helm-chart DEPLOYMENT=microk8s`. This will disable the attestation verification code, since the kata UVM is not running.

TODO: add intructions for deployment

### Prod (AKS)

![alt text](docs/production.svg)

https://github.com/microsoft/confidential-container-demos/tree/main/kafka

In production, a GitHub action invokes `make all` to build the images with Kaniko, which pulls the sources from the GitHub repo and pushes the artefacts to MCR.

Another action takes the image hashes from MCR and renders the Helm chart with `make helm-chart DEPLOYMENT=aks`. This will also set the `enable_confidentiality` feature flag, to use the UVM policy stuff.

TODO: add intructions for deployment

For the fronted there is a `fleek-build` script specifid in `package.json`, which is picked up by Fleek when there are new pushes to master. This deploys the sourcemapped frontend to IPFS to make it auditable and immutable.

## Verification

In order to verify the integrity of the images in the registry you can rerun the Kaniko builds as they are specified in the CI. (assuming the source code is safe)

You can then pull the images from the registry and verify that the files' SHAs are matching.

(provide script that does this easily)
k8s/scripts/verify.sh

---

## Deploying to microk8s

Prerequisites:

- Run `az login` on host
- Create service principal: `az ad sp create-for-rbac --name enclaveid-dev`
- Create keyvault
- Assign role to keyvault

Deployment:

- Create a .env file in `/createSecrets` with the service principal credentials
- `make build DEPLOYMENT=aks`
- `make helm-chart DEPLOYMENT=microk8s`

## Deploying to AKS in prod

We have two resource groups in azure:

- enclaveid-dev: standard keystore
- enclaveid-prod: aks cluster + MHSM keystore

Reference: https://learn.microsoft.com/en-us/azure/aks/deploy-confidential-containers-default-policy

Set some env vars:

```bash
AZURE_RESOURCE_GROUP=enclaveid-prod

AZURE_CLUSTER_NAME=enclaveid-cluster
AZURE_NODE_VM_SIZE=Standard_DC4as_cc_v5

AZURE_REGION=eastus2
AZURE_SERVICE_ACCOUNT_NAME=enclaveid-cluster-identity-sa
AZURE_SUBSCRIPTION=$(az account show --query id --output tsv)
AZURE_USER_ASSIGNED_IDENTITY_NAME=enclaveid-cluster-identity
AZURE_FEDERATED_IDENTITY_CREDENTIAL_NAME=enclaveid-cluster-identity-credential

MAA_ENDPOINT="sharedeus.eus.attest.azure.net"
```

Requirements setup:

```bash
# Install aks-preview extension
az extension add --name aks-preview
az extension update --name aks-preview

# Install confcom extension
az extension add --name confcom
az extension update --name confcom

# Register Kata CoCo feature flag
az feature register --namespace "Microsoft.ContainerService" --name "KataCcIsolationPreview"

# Verify registration status and refresh registration status in resource provider
az feature show --namespace "Microsoft.ContainerService" --name "KataCcIsolationPreview"
az provider register --namespace "Microsoft.ContainerService"
```

Deploy a new cluster (this starts billing the VMs):

```bash
# Create the cluster with one system node (need the same CVM type bc of kata)
az aks create --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_CLUSTER_NAME}" --kubernetes-version 1.29 --os-sku AzureLinux --node-vm-size "${AZURE_NODE_VM_SIZE}" --node-count 1 --enable-oidc-issuer --enable-workload-identity --generate-ssh-keys

# Get cluster credentials
az aks get-credentials --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_CLUSTER_NAME}" --overwrite-existing

# Add a nodepool with 2 nodes for the enclaveid workloads (excluding ML)
az aks nodepool add --resource-group "${AZURE_RESOURCE_GROUP}" --name nodepool2 --cluster-name "${AZURE_CLUSTER_NAME}" --node-count 2 --os-sku AzureLinux --node-vm-size "${AZURE_NODE_VM_SIZE}" --workload-runtime KataCcIsolation
```

Setup Federated Identity

```bash
# Get the OIDC issuer
AKS_OIDC_ISSUER="$(az aks show -n "${AZURE_CLUSTER_NAME}" -g "${AZURE_RESOURCE_GROUP}" --query "oidcIssuerProfile.issuerUrl" -otsv)"

# Create a managed identity for the cluster
az identity create --name "${AZURE_USER_ASSIGNED_IDENTITY_NAME}" --resource-group "${AZURE_RESOURCE_GROUP}" --location "${AZURE_REGION}" --subscription "${AZURE_SUBSCRIPTION}"

# With the setup complete, we can now use MANAGED_IDENTITY in the initContainer
# and USER_ASSIGNED_CLIENT_ID in the ServiceAccount config
```

Deploy the Kata-agnostic portion of the Helm chart:

```bash
# Render the chart
make helm-chart DEPLOYMENT=aks AZURE_RESOURCE_GROUP=$AZURE_RESOURCE_GROUP AZURE_USER_ASSIGNED_IDENTITY_NAME=$AZURE_USER_ASSIGNED_IDENTITY_NAME

kubectl apply –f k8s/renders/k8s-configs.yaml
```

Create the federated identity credential between the managed identity, service account issuer, and subject:

```bash
az identity federated-credential create --name ${AZURE_FEDERATED_IDENTITY_CREDENTIAL_NAME} --identity-name ${AZURE_USER_ASSIGNED_IDENTITY_NAME} --resource-group ${AZURE_RESOURCE_GROUP} --issuer ${AKS_OIDC_ISSUER} --subject system:serviceaccount:default:${AZURE_SERVICE_ACCOUNT_NAME}
```

Set up the KV with the right roles:

```bash

```

Deploy the Kata portion of the Helm chart:

```bash
kubectl apply –f k8s/renders/kata-configs.yaml
```
