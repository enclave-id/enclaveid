import { Buffer } from 'buffer';

function generateNonce(): Uint8Array {
  return window.crypto.getRandomValues(new Uint8Array(16));
}

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
