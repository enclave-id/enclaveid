# EnclaveID

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
