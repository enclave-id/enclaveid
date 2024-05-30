import subprocess


# Check if CUDA is available without having to import torch
def is_cuda_available():
    try:
        subprocess.check_output("nvidia-smi")
        return True
    except Exception:
        return False
