# EnclaveID

[Figma mocks](https://www.figma.com/file/tSGSLE1L5AlOLq80oV27Xu/EnclaveID?type=design&node-id=0%3A1&mode=design&t=XdBNuLxnG8pWEQtd-1) |
[Trello board](https://trello.com/b/jsbSDdMQ/enclaveid)

## Docs

- [Architecture](docs/architecture.md)
- [Deployment](docs/deployment.md)
- [Verification](docs/verification.md)

## Getting started

Docker and Node.js are required for local development. The monorepo is managed with pnpm and Nx; to install them and the project dependencies, run:

```bash
npm install -g pnpm
pnpm add --global nx@latest
pnpm install
```

Additionally, you should install all the [recommended](.vscode/extensions.json) VSCode extensions. Most importantly, the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension.

## Development

We distinguish 3 different environments in the development cycle:

- **No cluster**: when developing features in isolation, for example when adding frontend components.
- **Microk8s cluster**: for development reliant on k8s features, such as chrome-controller.
- **AKS cluster**: for development reliant on locally unavailable hardware, such as GPU for the data pipeline and AMD SEV-SNP for confidentiality.

See the [deployment](docs/deployment.md) document for instructions on how to set up the clusters. Get in touch with the development team to get access to the AKS cluster credentials.

### Environment variables

The environment variables are managed with the `.env` file. The `.env.example` file contains all the required variables. Copy it to `.env` and fill in the values you need for the application you're developing.

These variables are also made available in the Microk8s cluster.

### Folder structure

- `apps/`: Nx managed applications
- `libs/`: Nx managed libraries
- `docs/`: Documentation
- `scripts/`: Scripts to manage the project
- `k8s/aux_containers/`: Auxiliary containers (initContainers, sidecars)
- `k8s/helm/`: Helm chart
- `k8s/renders/`: Helm chart renders
- `k8s/scripts/`: Scripts to post-process the renders

Refer to each application / library's README for more information on how to run them.
