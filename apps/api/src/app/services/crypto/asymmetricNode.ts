import {
  createHash,
  createPublicKey,
  generateKeyPairSync,
  privateDecrypt,
} from 'crypto';
import { mockPrivateKey, mockPublicKey } from '../mocks';
import { RSA_PKCS1_OAEP_PADDING } from 'node:constants';

const { privateKey: privateKeyProd, publicKey: publicKeyProd } =
  generateKeyPairSync('rsa', {
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
  });

export async function getPublicEncryptionKey() {
  const pem =
    process.env.NODE_ENV === 'development' ? mockPublicKey : publicKeyProd;

  return createPublicKey(pem);
}

async function getPrivateEncryptionKey() {
  const pem =
    process.env.NODE_ENV === 'development' ? mockPrivateKey : privateKeyProd;

  return pem;
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

  const encryptedBuffer = Buffer.from(encryptedText, 'base64');

  const decryptedBuffer = privateDecrypt(
    {
      key: privateEncryptionKey,
      padding: RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
      passphrase: '',
    },
    encryptedBuffer,
  );

  return decryptedBuffer.toString('utf-8');
}
