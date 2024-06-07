# data-pipeline

## Deployment

## To just deploy dagster agent for testing

```bash
kubectl create secret generic dagster-cloud-agent-token --from-literal=DAGSTER_CLOUD_AGENT_TOKEN=$DAGSTER_TOKEN

helm repo add dagster-plus https://dagster-io.github.io/helm-user-cloud && helm repo update

helm upgrade --install enclaveid dagster-plus/dagster-cloud-agent --set dagsterCloud.deployment=prod
```
