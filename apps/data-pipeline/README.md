# data-pipeline

This app is the Dagster pipeline used to convert the raw portability archives into the insights that are displayed in the web app.

## Development

### Requirements

You're gonna need [poetry](https://python-poetry.org/docs/#installation) to install the project dependencies.

### Local

To install the dependencies, run the `install` nx target, and then to start the development server run the `dev` target.

### Cluster

The development cycle for ML features is a little slower, so try to develop as much as you can using the local environment. The process is as follows:

1. Develop the feature in the local environment.
2. Make sure there are no errors locally.
3. Build and push the Docker image. (by running the `container` nx target)
4. In the Dagster Cloud UI, reload the code definition for the pipeline.
5. Materialize the assets you've modified.

For the cluster deployments there are two distinct images that will be built by the `container` target: data-pipeline-base and data-pipeline-ml. The base image is small while ml image is around 20gb because of the cuda and pytorch dependencies. The Docker image is layered so that the ML deps are installed first, so to avoid invalidating the layer cache we should minimize their changes.

## Deploy the Dagster Cloud Agent

This one time setup is required when first setting up the cluster.

```bash
kubectl create secret generic dagster-cloud-agent-token --from-literal=DAGSTER_CLOUD_AGENT_TOKEN=$DAGSTER_TOKEN
helm repo add dagster-plus https://dagster-io.github.io/helm-user-cloud && helm repo update
helm upgrade --install enclaveid dagster-plus/dagster-cloud-agent --set dagsterCloud.deployment=prod
```
