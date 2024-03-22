#!/bin/bash

# This script is used to create the CA and storage key 
# with the skr policy and upload them to AKS

# Create the CA and storage key with the skr policy
az keyvault certificate create --vault-name $KEYVAULT_NAME --name $CA_NAME --policy "$(cat $CA_POLICY)"
az keyvault key create --vault-name $KEYVAULT_NAME --name $STORAGE_KEY_NAME --policy "$(cat $STORAGE_KEY_POLICY)"

# Upload the CA and storage key to AKS
az aks update --resource-group $RESOURCE_GROUP --name $AKS_NAME --attach-acr $ACR_NAME --enable-pod-identity
az aks pod-identity add --resource-group $RESOURCE_GROUP --cluster-name $AKS_NAME --namespace $NAMESPACE --name $IDENTITY_NAME --identity-resource-id $IDENTITY_RESOURCE_ID
az aks pod-identity binding add --resource-group $RESOURCE_GROUP --cluster-name $AKS_NAME --namespace $NAMESPACE --name $IDENTITY_NAME --identity-resource-id $IDENTITY_RESOURCE_ID
