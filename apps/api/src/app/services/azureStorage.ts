import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} from '@azure/storage-blob';

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const defaultContainerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

const creds = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  creds
);
const containerClient =
  blobServiceClient.getContainerClient(defaultContainerName);

export async function generateSasUrl(blobName) {
  const sasOptions = {
    containerName: defaultContainerName,
    blobName,
    permissions: BlobSASPermissions.parse('w'), // w is for write permissions
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 86400), // URL valid for 1 day
  };

  const sasToken = generateBlobSASQueryParameters(sasOptions, creds).toString();

  return `${containerClient.url}/${blobName}?${sasToken}`;
}

export async function streamingUpload(filename, file) {
  const blockBlobClient = containerClient.getBlockBlobClient(filename);
  return await blockBlobClient.uploadStream(file);
}
