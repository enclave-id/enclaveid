import {
  createHash,
  createPrivateKey,
  createPublicKey,
  generateKeyPair,
  privateDecrypt,
} from 'crypto';
import { writeFile, readFile } from 'fs/promises';
import { mockPrivateKey, mockPublicKey } from './mocks';

async function getPublicEncryptionKey() {
  const pem =
    process.env.NODE_ENV === 'development'
      ? mockPublicKey
      : await readFile('publicKey.pem', { encoding: 'utf-8' });

  return createPublicKey(pem);
}

async function getPrivateEncryptionKey() {
  const pem =
    process.env.NODE_ENV === 'development'
      ? mockPrivateKey
      : await readFile('privateKey.pem', { encoding: 'utf-8' });

  return createPrivateKey(pem);
}

export async function generateAsymmetricKeyPair() {
  if (process.env.NODE_ENV === 'development') return;

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

export async function getPublicKeyHashNode() {
  const publicKey = await getPublicEncryptionKey();
  const keyDer = publicKey.export({ type: 'spki', format: 'der' });

  const hash = createHash('sha256');
  hash.update(keyDer);
  return hash.digest('base64');
}

export async function asymmetricDecrypt(encryptedText: string) {
  const privateEncryptionKey = await getPrivateEncryptionKey();

  return privateDecrypt(
    privateEncryptionKey,
    Buffer.from(encryptedText, 'base64'),
  ).toString();
}
