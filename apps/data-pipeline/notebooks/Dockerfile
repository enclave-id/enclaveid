FROM enclaveid/data-pipeline-ml:master

RUN pip install jupyterlab jupyterlab-lsp 'python-lsp-server[all]' azure-storage-blob dtale

#RUN pip install nx-cugraph-cu11==24.4.0 --extra-index-url https://pypi.nvidia.com
#ENV NETWORKX_AUTOMATIC_BACKENDS=cugraph

EXPOSE 8888

CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root", "--NotebookApp.allow_origin=*"]
