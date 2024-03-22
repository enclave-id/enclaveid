import { Buffer } from 'buffer';

export function parsePublicKey(publicKeyString: string): Buffer {
  const pemHeader = '-----BEGIN PUBLIC KEY-----';
  const pemFooter = '-----END PUBLIC KEY-----';
  const keyBody = publicKeyString
    .replace(pemHeader, '')
    .replace(pemFooter, '')
    .replace(/\s+/g, '');

  return Buffer.from(keyBody, 'base64');
}

export async function getEnclaveCryptoKey(
  publicKeyBuffer: Buffer,
): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    'spki',
    publicKeyBuffer,
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' },
    },
    true,
    ['encrypt'],
  );
}

export function asymmetricEncrypt(
  data: unknown,
  publicKey: CryptoKey,
): Promise<string> {
  return window.crypto.subtle
    .encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      new TextEncoder().encode(JSON.stringify(data)),
    )
    .then((encrypted) => {
      return Buffer.from(encrypted).toString('base64');
    });
}

export async function getPublicKeyHashBrowser(publicKeyBuffer: Buffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', publicKeyBuffer);

  return Buffer.from(hashBuffer).toString('base64');
}
