import { generateKeyPair, createHash } from 'crypto';
import { writeFile, readFile } from 'fs/promises';

export async function generateAsymmetricKeyPair() {
  const { privateKey, publicKey } = await new Promise<{
    privateKey: string;
    publicKey: string;
  }>((resolve, reject) => {
    generateKeyPair(
      'rsa',
      {
        modulusLength: 2048, // Key size in bits
        publicKeyEncoding: {
          type: 'spki', // Recommended public key encoding
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8', // Recommended private key encoding
          format: 'pem',
          cipher: 'aes-256-cbc', // Optional private key encryption
          passphrase: '', // Optional passphrase for private key encryption
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

export async function getPublicKeyHash() {
  const publicKey = await readFile('publicKey.pem', { encoding: 'utf-8' });
  const hash = createHash('sha256');
  hash.update(publicKey);
  const digest = hash.digest('hex');
  return digest;
}
