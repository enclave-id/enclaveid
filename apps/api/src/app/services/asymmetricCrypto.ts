import { createHash, generateKeyPair, privateDecrypt } from 'crypto';
import { writeFile, readFile } from 'fs/promises';
import { mockPublicKey } from './mocks';

export async function generateAsymmetricKeyPair() {
  const { privateKey, publicKey } = await new Promise<{
    privateKey: string;
    publicKey: string;
  }>((resolve, reject) => {
    generateKeyPair(
      'rsa',
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: '',
        },
      },
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        else resolve({ publicKey, privateKey });
      },
    );
  });

  await writeFile('publicKey.pem', publicKey);
  await writeFile('privateKey.pem', privateKey);
}

// Same as: cat publicKey.pem | openssl dgst -sha256 -binary | base64
export async function getPublicKeyHashNode() {
  const publicKey = await readFile('publicKey.pem', { encoding: 'utf-8' });
  const pemHeader = '-----BEGIN PUBLIC KEY-----';
  const pemFooter = '-----END PUBLIC KEY-----';
  const keyBody = publicKey
    .replace(pemHeader, '')
    .replace(pemFooter, '')
    .replace(/\s+/g, '');

  const hash = createHash('sha256');
  hash.update(Buffer.from(keyBody, 'base64'));
  return hash.digest('base64');
}

export async function getPublicKey(): Promise<string> {
  if (process.env.NODE_ENV === 'development') return mockPublicKey;

  return await readFile('publicKey.pem', { encoding: 'utf-8' });
}

export async function asymmetricDecrypt(encryptedText: string) {
  const privateEncryptionKey = await readFile('privateKey.pem', {
    encoding: 'utf-8',
  });

  return privateDecrypt(
    privateEncryptionKey,
    Buffer.from(encryptedText, 'base64'),
  ).toString();
}
