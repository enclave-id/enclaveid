import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} from '@azure/storage-blob';
import { DataProvider } from '@enclaveid/shared';

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const defaultContainerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

const creds = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  creds,
);
const containerClient =
  blobServiceClient.getContainerClient(defaultContainerName);

export async function generateSasUrl(
  dataProvider: DataProvider,
  userId: string,
): Promise<string> {
  const blobName = `${userId}/${dataProvider.toLowerCase()}/${Date.now()}`;
  const latestBlobName = `${userId}/${dataProvider.toLowerCase()}/latest`;

  const sasOptions = {
    containerName: defaultContainerName,
    blobName,
    permissions: BlobSASPermissions.parse('w'),
    startsOn: new Date(),
    expiresOn: new Date(3600 * 1000 * 24 + new Date().valueOf()), // URL valid for 1 day
  };

  const sasToken = generateBlobSASQueryParameters(sasOptions, creds).toString();

  const blobClient = containerClient.getBlobClient(blobName);
  containerClient
    .getBlobClient(latestBlobName)
    .beginCopyFromURL(blobClient.url);

  return `${containerClient.url}/${blobName}?${sasToken}`;
}

export async function streamingUpload(filename, file) {
  const blockBlobClient = containerClient.getBlockBlobClient(filename);
  return await blockBlobClient.uploadStream(file);
}
