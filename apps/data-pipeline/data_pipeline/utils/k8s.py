gpu_toleration_tags = {
    "dagster-k8s/config": {
        "pod_spec_config": {
            "tolerations": [
                {
                    "key": "sku",
                    "operator": "Equal",
                    "value": "gpu",
                    "effect": "NoSchedule",
                }
            ],
        }
    }
}
