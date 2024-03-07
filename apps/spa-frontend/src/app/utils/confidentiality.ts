// AES-CTR encryption and decryption functions

import { Buffer } from 'buffer';

function getSessionKey(): Uint8Array {
  const key = sessionStorage.getItem('sessionKey');
  if (key) {
    return new Uint8Array(JSON.parse(key));
  } else {
    const key = window.crypto.getRandomValues(new Uint8Array(16));
    sessionStorage.setItem('sessionKey', JSON.stringify(Array.from(key)));
    return key;
  }
}

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
      hash: 'SHA-256',
    },
    true,
    ['encrypt'],
  );
}

export function generateNonce(): Uint8Array {
  return window.crypto.getRandomValues(new Uint8Array(16));
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

export async function symmetricEncrypt(
  variables: Record<string, unknown>,
): Promise<{
  encryptedPayload: string;
  nonce: string;
}> {
  const data = JSON.stringify(variables);
  const encodedData = new TextEncoder().encode(data);

  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    getSessionKey(),
    { name: 'AES-CTR' },
    false,
    ['encrypt'],
  );

  const nonce = generateNonce();
  const encryptedPayload = await window.crypto.subtle.encrypt(
    { name: 'AES-CTR', counter: nonce, length: 64 },
    cryptoKey,
    encodedData,
  );

  return {
    encryptedPayload: Buffer.from(encryptedPayload).toString('base64'),
    nonce: Buffer.from(nonce).toString('base64'),
  };
}

export async function symmetricDecrypt(
  encryptedPyload: string,
  nonce: string,
): Promise<Record<string, unknown>> {
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    getSessionKey(),
    { name: 'AES-CTR' },
    false,
    ['decrypt'],
  );

  const decryptedPayload = await window.crypto.subtle.decrypt(
    { name: 'AES-CTR', counter: Buffer.from(nonce, 'base64'), length: 64 },
    cryptoKey,
    Buffer.from(encryptedPyload, 'base64'),
  );

  const data = new TextDecoder().decode(decryptedPayload);
  return JSON.parse(data);
}
