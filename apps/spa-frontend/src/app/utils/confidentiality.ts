// AES-CTR encryption and decryption functions

import { arrayBufferToBase64, base64ToArrayBuffer } from './arrayBuffer';

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

function generateNonce(): Uint8Array {
  return window.crypto.getRandomValues(new Uint8Array(16));
}

export async function encryptVariables(
  variables: Record<string, unknown>
): Promise<{
  encryptedVariables: string;
  nonce: Uint8Array;
}> {
  const data = JSON.stringify(variables);
  const encodedData = new TextEncoder().encode(data);

  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    getSessionKey(),
    { name: 'AES-CTR' },
    false,
    ['encrypt']
  );

  const nonce = generateNonce();
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-CTR', counter: nonce, length: 64 },
    cryptoKey,
    encodedData
  );

  return { encryptedVariables: arrayBufferToBase64(encryptedData), nonce };
}

export async function decryptVariables(
  encryptedVariables: string,
  nonce: Uint8Array
): Promise<Record<string, unknown>> {
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    getSessionKey(),
    { name: 'AES-CTR' },
    false,
    ['decrypt']
  );

  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'AES-CTR', counter: nonce, length: 64 },
    cryptoKey,
    base64ToArrayBuffer(encryptedVariables)
  );

  const data = new TextDecoder().decode(decryptedData);
  return JSON.parse(data);
}
