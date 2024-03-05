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

export function generateNonce(): Uint8Array {
  return window.crypto.getRandomValues(new Uint8Array(16));
}

export function asymmetricEncrypt(
  data: unknown,
  publicKey: string,
): Promise<string> {
  return crypto.subtle
    .importKey(
      'spki',
      Buffer.from(publicKey, 'base64'),
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      true,
      ['encrypt'],
    )
    .then((pk) => {
      return window.crypto.subtle
        .encrypt(
          { name: 'RSA-OAEP' },
          pk,
          new TextEncoder().encode(JSON.stringify(data)),
        )
        .then((encrypted) => {
          return Buffer.from(encrypted).toString('base64');
        });
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
