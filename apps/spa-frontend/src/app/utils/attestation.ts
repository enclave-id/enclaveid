// @ts-expect-error TODO idk why but vite won't compile without the .ts
import { mockPCR0 } from 'apps/api/src/app/services/mocks.ts';
import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
  base64ToUint8array,
} from './typeConversion';
import { Buffer } from 'buffer';

export const expectedPcr0 =
  process.env.NODE_ENV === 'development' ? mockPCR0 : 'TODO';

export async function pemToCryptoKey(pem: string) {
  // Remove PEM header and footer

  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return await window.crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'ECDSA',
      namedCurve: 'P-384',
    },
    true,
    ['sign'],
  );
}

function deserialize(userData: Uint8Array) {
  const hashPrefixSize = 7; // Size of hashPrefix "sha256:"
  const hashSize = 32; // Size of SHA-256 hash

  // Extract tlsKeyHash
  const tlsKeyHashStart = hashPrefixSize;
  const tlsKeyHashEnd = tlsKeyHashStart + hashSize;
  const tlsKeyHashBytes = userData.slice(tlsKeyHashStart, tlsKeyHashEnd);

  // Extract appKeyHash
  const appKeyHashStart = tlsKeyHashEnd + hashPrefixSize + 1; // +1 for semicolon
  const appKeyHashEnd = appKeyHashStart + hashSize;
  const appKeyHashBytes = userData.slice(appKeyHashStart, appKeyHashEnd);

  return { tlsKeyHashBytes, appKeyHashBytes };
}

export function decodeAttestation(validationResult: string) {
  const attestation = JSON.parse(validationResult);

  const pcr0 = Buffer.from(base64ToUint8array(attestation.pcrs['0'])).toString(
    'hex',
  );
  const nonce = Buffer.from(base64ToUint8array(attestation.nonce)).toString(
    'hex',
  );
  const { appKeyHashBytes } = deserialize(
    base64ToUint8array(attestation.user_data),
  );

  const b64PublicKeyDigest = Buffer.from(appKeyHashBytes).toString('base64');

  return { pcr0, nonce, b64PublicKeyDigest };
}

export async function getb64PublicKeyDigest(publicKeyPem: string) {
  const pemHeader = '-----BEGIN PUBLIC KEY-----';
  const pemFooter = '-----END PUBLIC KEY-----';

  const pemContents = publicKeyPem.substring(
    pemHeader.length + 1,
    publicKeyPem.length - pemFooter.length - 1,
  );

  console.log('pemContents:', pemContents);

  const keyArray = base64ToArrayBuffer(pemContents);
  const hash = await window.crypto.subtle.digest('SHA-256', keyArray);

  return arrayBufferToBase64(hash);
}
