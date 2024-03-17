NAMESPACE := default
REGISTRY := registry.container-registry.svc.cluster.local:5000
APPS_DIR := apps

TEMPLATE_FILE := ./k8s/dev/kaniko.yaml
PV_FILE := ./k8s/dev/kaniko-pv.yaml
PVC_FILE := ./k8s/dev/kaniko-pvc.yaml

KANIKO_IMAGE := gcr.io/kaniko-project/executor:v1.21.1

# Find all applications with a Dockerfile.dev
APPS := $(shell find $(APPS_DIR) -name Dockerfile.dev | sed 's|/Dockerfile.dev||' | xargs -n 1 basename)

.PHONY: all $(APPS) apply-pv apply-pvc

all: apply-pv apply-pvc $(APPS)

apply-pv:
	@HOST_PATH=$(shell pwd) \
	envsubst < $(PV_FILE) | microk8s kubectl apply -f -

apply-pvc:
	microk8s kubectl apply -f $(PVC_FILE)

# Target for each application
$(APPS):
	@APP_NAME=$@ \
	DOCKERFILE_PATH=$(APPS_DIR)/$@/Dockerfile.dev \
	BUILD_CONTEXT=/ \
	DESTINATION_IMAGE=$(REGISTRY)/$@:latest \
	NAMESPACE=$(NAMESPACE) \
	KANIKO_IMAGE=$(KANIKO_IMAGE) \
	envsubst < $(TEMPLATE_FILE) | microk8s kubectl apply -f -

clean:
	microk8s kubectl delete pod -n $(NAMESPACE) --selector=category=kaniko-build
