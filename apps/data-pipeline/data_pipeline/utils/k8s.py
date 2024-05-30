k8s_gpu_config = {
    "dagster-k8s/config": {
        "container_config": {
            "image": "enclaveid/data-pipeline-ml:master",
        },
        "pod_spec_config": {
            "tolerations": [
                {
                    "key": "sku",
                    "operator": "Equal",
                    "value": "gpu",
                    "effect": "NoSchedule",
                }
            ],
        },
    }
}
