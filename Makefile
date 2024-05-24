include .env

ENV ?= dev
VERSION ?= 0.0.0

# Change to enclaveid.azurecr.io for remote registry
REGISTRY := registry.container-registry.svc.cluster.local:5000

# Find all auxiliary containers
AUX_CONTAINERS_DIR := k8s/aux_containers
AUX_CONTAINERS := $(shell find $(AUX_CONTAINERS_DIR) -name Dockerfile | sed 's|/Dockerfile||' | xargs -n 1 basename)

build:
	pnpm exec nx run-many --target=build --all --parallel

# TODO: Can we make nx handle this too?
.PHONY: aux-containers
aux-containers:
	@for container in $(AUX_CONTAINERS); do \
		docker build -t $(REGISTRY)/enclaveid/$$container:$(VERSION) $(AUX_CONTAINERS_DIR)/$$container & \
	done
	@wait
	@for container in $(AUX_CONTAINERS); do \
		docker push $(REGISTRY)/enclaveid/$$container:$(VERSION) & \
	done
	@wait

.PHONY: containers
containers: build
	pnpm exec nx run-many --target=container --all --parallel --output-style=stream

.PHONY: update-app-version
update-app-version:
	@echo "Updating app version to $(VERSION)"
	@yq eval -i '.appVersion = "$(VERSION)"' k8s/helm/Chart.yaml

helm-chart: update-app-version
	RELEASE_NAME=$(VERSION) ./k8s/scripts/render_chart_$(ENV).sh

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

.PHONY: clean-chrome-pods
clean-chrome-pods:
	kubectl delete pods -n default -l class=chrome-pod; \
	kubectl delete services -n default -l class=chrome-pod;

