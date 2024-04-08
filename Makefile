ENV ?= dev
VERSION ?= 0.0.0
RELEASE_NAME := $(ENV)-$(VERSION)

CLUSTER_NAMESPACE := default
REGISTRY := registry.container-registry.svc.cluster.local:5000
KANIKO_TEMPLATES_DIR := k8s/build/$(ENV)

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
build: apply-pv apply-pvc $(INIT_CONTAINERS) $(APPS)

.PHONY: apply-pv
apply-pv:
	HOST_PATH=$(shell pwd) envsubst < $(KANIKO_TEMPLATES_DIR)/kaniko-pv.yaml | microk8s kubectl apply -f -

.PHONY: apply-pvc
apply-pvc:
	microk8s kubectl apply -f $(KANIKO_TEMPLATES_DIR)/kaniko-pvc.yaml

# Target for each application
.PHONY: $(APPS)
$(APPS):
	NAME=$@ \
	DOCKERFILE_PATH=$(APPS_DIR)/$@/Dockerfile \
	DESTINATION_IMAGE=$(REGISTRY)/$@:$(RELEASE_NAME) \
	NAMESPACE=$(CLUSTER_NAMESPACE) \
	envsubst < $(KANIKO_TEMPLATES_DIR)/kaniko.yaml \
	| kubectl apply -f -

# Target for initContainers
.PHONY: $(INIT_CONTAINERS)
$(INIT_CONTAINERS):
	NAME=$@ \
	DOCKERFILE_PATH=$(INIT_CONTAINERS_DIR)/$@/Dockerfile \
	DESTINATION_IMAGE=$(REGISTRY)/$@:$(RELEASE_NAME) \
	NAMESPACE=$(CLUSTER_NAMESPACE) \
	envsubst < $(KANIKO_TEMPLATES_DIR)/kaniko.yaml \
	| kubectl apply -f -

# Target for sidecars
.PHONY: $(SIDECARS)
$(SIDECARS):
	NAME=$@ \
	DOCKERFILE_PATH=$(SIDECARS_DIR)/$@/Dockerfile \
	DESTINATION_IMAGE=$(REGISTRY)/$@:$(RELEASE_NAME) \
	NAMESPACE=$(CLUSTER_NAMESPACE) \
	envsubst < $(KANIKO_TEMPLATES_DIR)/kaniko.yaml \
	| kubectl apply -f -

# Run this target to clean up kaniko pods
.PHONY: clean-kaniko
clean-kaniko:
	microk8s kubectl delete pod -n $(CLUSTER_NAMESPACE) --selector=category=kaniko-build

.PHONY: update-app-version
update-app-version:
	@echo "Updating app version to $(RELEASE_NAME)"
	@yq eval -i '.appVersion = "$(RELEASE_NAME)"' k8s/helm/Chart.yaml

helm-chart: update-app-version
	RELEASE_NAME=$(RELEASE_NAME) ENV=$(ENV) ./k8s/scripts/render_chart_$(ENV).sh

.PHONY: deploy
deploy:
	kubectl apply -f k8s/renders/k8s-configs.yaml -f k8s/renders/kata-configs.yaml

.PHONY: undeploy
undeploy:
	kubectl delete -f k8s/renders/k8s-configs.yaml -f k8s/renders/kata-configs.yaml

