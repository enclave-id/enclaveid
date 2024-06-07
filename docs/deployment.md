# Deployment

## Deploying to microk8s

To install the requirements:

```
sudo dnf -y install skopeo jq helm dnsmasq
sudo snap install yq
```

To setup the `microk8s` cluster for local development:

```bash
# Install MicroK8s
sudo snap install microk8s --classic --channel=1.29

sudo usermod -a -G microk8s $USER
newgrp microk8s

microk8s status --wait-ready
microk8s enable dns registry dashboard hostpath-storage metrics-server

# Configure kubectl:
# https://microk8s.io/docs/working-with-kubectl
microk8s config > $HOME/.kube/config

# Configure your host machine to use the DNS service of MicroK8s for resolving service names within the  cluster. Fedora example using systemd-resolved:
echo -e "[Resolve]\nDNS=10.152.183.10\nDomains=~cluster.local" | sudo tee /etc/systemd/resolved.conf.d/microk8s.conf

echo -e "[Match]\nName=*\n\n[Network]\nDHCP=yes\n\n[Domain]\nName=cluster.local" | sudo tee /etc/systemd/network/10-microk8s.network

# Restart systemd-resolved
sudo systemctl restart systemd-resolved

# Add the registry to the insecure registries list
echo "
{
  \"insecure-registries\" : [\"registry.container-registry.svc.cluster.local:5000\"]
}
" | sudo tee /etc/docker/daemon.json

# Restart Docker
sudo systemctl restart docker

# To access the dashboard
microk8s dashboard-proxy
```

Prerequisites:

- Run `az login` on host
- Create service principal: `az ad sp create-for-rbac --name enclaveid-dev`
- Create keyvault
- Assign role to keyvault: `az keyvault set-policy --name enclaveid-dev --spn 1c79e8e8-67d1-4dd8-a15a-d2d34f5902ec --key-permissions all`

Deployment:

Create a .env file in `/createSecrets` with the service principal credentials

Running `make build` at the project root will spin up a Kaniko pod for each application that has a `Dockerfile`. The built images will be stored in the local microk8s registry.

To render the chart with the newly built images, run `make helm-chart && kube...`. This will disable the attestation verification code by default, since the kata UVM is not running.

## Deploying to AKS in prod

For the fronted there is a `fleek-build` script specifid in `package.json`, which is picked up by Fleek when there are new pushes to master.

In production, a GitHub action invokes `make all` to build the images with Kaniko, which pulls the sources from the GitHub repo and pushes the artefacts to MCR.

Another action takes the image hashes from MCR and renders the Helm chart with `make helm-chart`. This will also set the `enable_confidentiality` feature flag, to use the UVM policy stuff.

In order to deploy to AKS in production, there are a bunch of things to configure.

Set up a resource group in Azure: `enclaveid-prod`

Reference: <https://learn.microsoft.com/en-us/azure/aks/deploy-confidential-containers-default-policy>

Set some env vars:

```bash
AZURE_RESOURCE_GROUP=enclaveid-prod

AZURE_CLUSTER_NAME=enclaveid-cluster
AZURE_NODE_VM_SIZE=Standard_DC4as_cc_v5 # For CPU workloads
AZURE_NODE_VM_SIZE_GPU=standard_nc24ads_a100_v4 # For GPU workloads

AZURE_REGION=westeurope
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

# Register AKS GPU image feature flag
az feature register --namespace "Microsoft.ContainerService" --name "GPUDedicatedVHDPreview"

# Verify registration status and refresh registration status in resource provider
az feature show --namespace "Microsoft.ContainerService" --name "KataCcIsolationPreview"
az feature show --namespace "Microsoft.ContainerService" --name "GPUDedicatedVHDPreview"

az provider register --namespace "Microsoft.ContainerService"
```

We need to create a cluster with one system node and two nodepools, one for CPU workloads (api, guacamole, dagster) and another for GPU workloads (dagster jobs).
We configure the cluster autoscaler to minimize costs.

```bash
# Create the cluster with one system node (need the same CVM type bc of kata)
az aks create --tier standard --location "${AZURE_REGION}" --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_CLUSTER_NAME}" --kubernetes-version 1.29 --os-sku AzureLinux --node-vm-size "${AZURE_NODE_VM_SIZE}" --node-count 1 --enable-oidc-issuer --enable-workload-identity --generate-ssh-keys  --enable-cluster-autoscaler

# Get cluster credentials
az aks get-credentials --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_CLUSTER_NAME}" --overwrite-existing

# Add a nodepool for CPU workloads with confidential computing
# IMPORTANT: Autoscaling is not supported for confidential computing nodes. Configuring the autoscaler for this pool will make austoscaling fail for the whole cluster.
az aks nodepool add --resource-group "${AZURE_RESOURCE_GROUP}" --name cpupool --cluster-name "${AZURE_CLUSTER_NAME}" --node-count 2 --os-sku AzureLinux --node-vm-size "${AZURE_NODE_VM_SIZE}" --workload-runtime KataCcIsolation

# Add a nodepool for GPU workloads
# We also add a taint to make sure only GPU workloads are scheduled here
az aks nodepool add --resource-group "${AZURE_RESOURCE_GROUP}" --name gpupool --cluster-name "${AZURE_CLUSTER_NAME}" --node-count 0 --labels sku=gpu --node-taints sku=gpu:NoSchedule --node-vm-size "${AZURE_NODE_VM_SIZE_GPU}" --min-count 0 --max-count 1 --enable-cluster-autoscaler --aks-custom-headers UseGPUDedicatedVHD=true

# Configure the autoscaler for the gpu workloads
az aks update --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_CLUSTER_NAME}" --cluster-autoscaler-profile skip-nodes-with-system-pods=false
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
