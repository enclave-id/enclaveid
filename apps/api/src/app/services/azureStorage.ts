import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} from '@azure/storage-blob';

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

const defaultContainerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

export async function generateSasUrl(
  blobName,
  containerName = defaultContainerName
) {
  const creds = new StorageSharedKeyCredential(accountName, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    creds
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const sasOptions = {
    containerName,
    blobName,
    permissions: BlobSASPermissions.parse('w'), // w is for write permissions
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 86400), // URL valid for 1 day
  };

  const sasToken = generateBlobSASQueryParameters(sasOptions, creds).toString();

  return `${containerClient.url}/${blobName}?${sasToken}`;
}
