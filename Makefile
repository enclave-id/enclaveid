include .env

ENV ?= dev
VERSION ?= 0.0.0
BRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)

RELEASE_NAME := $(VERSION)

CLUSTER_NAMESPACE := default
# Change to enclaveid.azurecr.io for remote registry
REGISTRY := registry.container-registry.svc.cluster.local:5000

build:
	nx run-many --target=build --all --parallel

.PHONY: update-app-version
update-app-version:
	@echo "Updating app version to $(RELEASE_NAME)"
	@yq eval -i '.appVersion = "$(RELEASE_NAME)"' k8s/helm/Chart.yaml

helm-chart: update-app-version
	RELEASE_NAME=$(RELEASE_NAME) ENV=$(ENV) ./k8s/scripts/render_chart_$(ENV).sh

.PHONY: deploy
deploy: helm-chart
	kubectl apply -f k8s/renders/k8s-configs.yaml -f k8s/renders/kata-configs.yaml

.PHONY: undeploy
undeploy:
	kubectl delete -f k8s/renders/k8s-configs.yaml -f k8s/renders/kata-configs.yaml


.PHONY: sync-dagster
sync-dagster:
	dagster-cloud workspace sync -w apps/data-pipeline/dagster_cloud.yaml \
    --api-token $(DAGSTER_API_TOKEN) \
    --organization enclaveid \
    --deployment prod

