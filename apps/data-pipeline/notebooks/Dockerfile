FROM enclaveid/data-pipeline-ml:master

RUN pip install jupyterlab jupyterlab-lsp 'python-lsp-server[all]'

EXPOSE 8888

CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root"]
