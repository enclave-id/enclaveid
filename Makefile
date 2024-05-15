include .env

ENV ?= dev
VERSION ?= 0.0.0
BRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)

RELEASE_NAME := $(VERSION)

CLUSTER_NAMESPACE := default
REGISTRY := registry.default.svc.cluster.local:5000

#enclaveid.azurecr.io
# Find all applications with a Dockerfile
APPS_DIR := apps
APPS := $(shell find $(APPS_DIR) -name Dockerfile | sed 's|/Dockerfile||' | xargs -n 1 basename)

# Find all initContainers
INIT_CONTAINERS_DIR := k8s/containers/init
INIT_CONTAINERS := $(shell find $(INIT_CONTAINERS_DIR) -name Dockerfile | sed 's|/Dockerfile||' | xargs -n 1 basename)

# Find all sidecars
SIDECARS_DIR := k8s/containers/sidecars
SIDECARS := $(shell find $(SIDECARS_DIR) -name Dockerfile | sed 's|/Dockerfile||' | xargs -n 1 basename)

.PHONY: print-targets
print-targets:
	@echo $(APPS) $(INIT_CONTAINERS) $(SIDECARS)

.PHONY: build
build: $(INIT_CONTAINERS) $(APPS)

.PHONY: docker-secret
docker-secret:
	AZURE_CLIENT_ID=$(AZURE_CLIENT_ID) \
  AZURE_CLIENT_SECRET=$(AZURE_CLIENT_SECRET) \
  AZURE_TENANT_ID=$(AZURE_TENANT_ID) \
  envsubst < k8s/build/docker-config.yaml | kubectl apply -f -

define DEPLOY_KANIKO
	NAME=$1 \
	CONTEXT_SUB_PATH=$2/$1/ \
	DESTINATION_IMAGE=$(REGISTRY)/$1:$(RELEASE_NAME) \
	NAMESPACE=$(CLUSTER_NAMESPACE) \
	BRANCH=$(BRANCH) \
	envsubst < k8s/build/kaniko.yaml | kubectl apply -f -
endef

# Target for each application
.PHONY: $(APPS)
$(APPS):
	$(call DEPLOY_KANIKO,$@,$(APPS_DIR))

# Target for initContainers
.PHONY: $(INIT_CONTAINERS)
$(INIT_CONTAINERS):
	$(call DEPLOY_KANIKO,$@,$(INIT_CONTAINERS_DIR))

# Target for sidecars
.PHONY: $(SIDECARS)
$(SIDECARS):
	$(call DEPLOY_KANIKO,$@,$(SIDECARS_DIR))

# Run this target to clean up kaniko pods
.PHONY: clean-kaniko
clean-kaniko:
	kubectl delete pod -n $(CLUSTER_NAMESPACE) --selector=category=kaniko-build

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
	@echo "Syncing dagster"
  CODE_LOCATION_IMAGE=$(REGISTRY)/data-pipeline:$(RELEASE_NAME) \
  envsubst < dagster_cloud_template.yaml > dagster_cloud.yaml \
  | dagster-cloud workspace sync -w dagster_cloud.yaml

