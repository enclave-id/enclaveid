ENV ?= dev
VERSION ?= 0.0.0

NAMESPACE := default
REGISTRY := registry.container-registry.svc.cluster.local:5000
APPS_DIR := apps

KANIKO_TEMPLATE_FILE := ./k8s/dev/kaniko.yaml
KANIKO_PV_FILE := ./k8s/dev/kaniko-pv.yaml
KANIKO_PVC_FILE := ./k8s/dev/kaniko-pvc.yaml
KANIKO_IMAGE := gcr.io/kaniko-project/executor:v1.21.1

# Helm chart
RELEASE_NAME := $(ENV)-$(VERSION)

# Find all applications with a Dockerfile
APPS := $(shell find $(APPS_DIR) -name Dockerfile | sed 's|/Dockerfile||' | xargs -n 1 basename)

.PHONY: all $(APPS) apply-pv apply-pvc

all: apply-pv apply-pvc $(APPS)

apply-pv:
	@HOST_PATH=$(shell pwd) \
	envsubst < $(KANIKO_PV_FILE) | microk8s kubectl apply -f -

apply-pvc:
	microk8s kubectl apply -f $(KANIKO_PVC_FILE)

# Target for each application
$(APPS):
	@APP_NAME=$@ \
	DOCKERFILE_PATH=$(APPS_DIR)/$@/Dockerfile \
	BUILD_CONTEXT=/ \
	DESTINATION_IMAGE=$(REGISTRY)/$@:latest \
	NAMESPACE=$(NAMESPACE) \
	KANIKO_IMAGE=$(KANIKO_IMAGE) \
	envsubst < $(KANIKO_TEMPLATE_FILE) | microk8s kubectl apply -f -

deploy:
	helm template $(RELEASE_NAME) ./k8s/helm --set \
	Values.image.tag=$(API_IMAGE_TAG) \
	> ./dist/$(RELEASE_NAME).yaml

clean:
	microk8s kubectl delete pod -n $(NAMESPACE) --selector=category=kaniko-build
