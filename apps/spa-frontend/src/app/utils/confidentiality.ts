// AES-CTR encryption and decryption functions

import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
  base64ToUint8array,
  uint8arrayToBase64,
} from './typeConversion';

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

export function asymmetricEncrypt(
  data: unknown,
  publicKey: CryptoKey
): Promise<string> {
  return window.crypto.subtle
    .encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      new TextEncoder().encode(JSON.stringify(data))
    )
    .then(arrayBufferToBase64);
}

export async function symmetricEncrypt(
  variables: Record<string, unknown>
): Promise<{
  encryptedData: string;
  nonce: string;
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

  return {
    encryptedData: arrayBufferToBase64(encryptedData),
    nonce: uint8arrayToBase64(nonce),
  };
}

export async function symmetricDecrypt(
  encryptedData: string,
  nonce: string
): Promise<Record<string, unknown>> {
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    getSessionKey(),
    { name: 'AES-CTR' },
    false,
    ['decrypt']
  );

  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'AES-CTR', counter: base64ToUint8array(nonce), length: 64 },
    cryptoKey,
    base64ToArrayBuffer(encryptedData)
  );

  const data = new TextDecoder().decode(decryptedData);
  return JSON.parse(data);
}
