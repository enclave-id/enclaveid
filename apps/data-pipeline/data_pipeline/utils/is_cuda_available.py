import subprocess

MIN_CUDA_COMPUTE_CAPABILITY = 7.0


# Check if CUDA is available without having to import torch
def is_cuda_available():
    try:
        compute_capability = subprocess.run(
            "nvidia-smi --query-gpu=compute_cap --format=csv,noheader|head -n 1",
            shell=True,
            text=True,
            capture_output=True,
        ).stdout.strip()

        return float(compute_capability) >= MIN_CUDA_COMPUTE_CAPABILITY
    except Exception:
        return False
