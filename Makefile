ENV ?= dev
VERSION ?= 0.0.0
RELEASE_NAME := $(ENV)-$(VERSION)

NAMESPACE := default
REGISTRY := registry.container-registry.svc.cluster.local:5000
APPS_DIR := apps
KANIKO_TEMPLATES_DIR := k8s/build/$(ENV)

# Find all applications with a Dockerfile
APPS := $(shell find $(APPS_DIR) -name Dockerfile | sed 's|/Dockerfile||' | xargs -n 1 basename)

.PHONY: build $(APPS) apply-pv apply-pvc helm-chart clean-kaniko

build: apply-pv apply-pvc $(APPS)

apply-pv:
	@HOST_PATH=$(shell pwd) envsubst < $(KANIKO_TEMPLATES_DIR)/kaniko-pv.yaml | microk8s kubectl apply -f -

apply-pvc:
	microk8s kubectl apply -f $(KANIKO_TEMPLATES_DIR)/kaniko-pvc.yaml

# Target for each application
$(APPS):
	@APP_NAME=$@ \
	DOCKERFILE_PATH=$(APPS_DIR)/$@/Dockerfile \
	DESTINATION_IMAGE=$(REGISTRY)/$@:$(RELEASE_NAME) \
	NAMESPACE=$(NAMESPACE) \
	envsubst < $(KANIKO_TEMPLATES_DIR)/kaniko.yaml \
	| microk8s kubectl apply -f -

helm-chart:
	DEPLOYMENT=$(DEPLOYMENT) \
	RELEASE_NAME=$(RELEASE_NAME) \
	REGISTRY=$(REGISTRY) \
	ENV=$(ENV) \
  ./k8s/scripts/render_chart.sh

clean-kaniko:
	microk8s kubectl delete pod -n $(NAMESPACE) --selector=category=kaniko-build
