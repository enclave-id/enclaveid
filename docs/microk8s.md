# Microk8s cluster setup

## Requirements

```bash
sudo dnf -y install skopeo jq helm dnsmasq
sudo snap install yq
```

## Set up Microk8s

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

## Tear down the cluster

```bash
sudo snap remove microk8s --purge
```
