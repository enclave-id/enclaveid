# EnclaveID

Figma mocks: <https://www.figma.com/file/tSGSLE1L5AlOLq80oV27Xu/EnclaveID?type=design&node-id=0%3A1&mode=design&t=XdBNuLxnG8pWEQtd-1>

Trello board: <https://trello.com/b/jsbSDdMQ/enclaveid>

## Docs

- [Architecture](docs/architecture.md){:target="_blank"}
- [Deployment](docs/deployment.md){:target="_blank"}
- [Verification](docs/verification.md){:target="_blank"}

## Development

We distinguish 3 different environments in the development cycle:

- `NODE_ENV==="development"` + no cluster: API and frontend development.
- `NODE_ENV==="production"` + microk8s: for development and testing of all features, excluding confidentiality.
- `NODE_ENV==="production"` + aks: actual production, with confidentiality.

Folder structure:

- `apps/`: Nx managed applications
- `libs/`: Nx managed libraries
- `docs/`: documentation
- `k8s/`: Kubernetes specific files
  - `aux_containers/`: auxiliary containers (initContainers, sidecars)
  - `helm/`: Helm chart
  - `renders/`: helm chart renders
  - `scripts/`: auxiliary scripts to customize the renders
