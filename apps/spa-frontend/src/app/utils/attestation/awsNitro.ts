// @ts-expect-error TODO idk why but vite won't compile without the .ts
import { mockPCR0, mockNonce } from 'apps/api/src/app/services/mocks.ts';
import { Buffer } from 'buffer';

function deserializeNitridingPayload(userData: Uint8Array) {
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

export function getExpectedMesaurements() {
  if (import.meta.env.VITE_ENABLE_CONFIDENTIALITY !== 'true') {
    return {
      expectedPcr0: mockPCR0,
      expectedNonce: mockNonce,
    };
  } else {
    throw new Error('Not implemented');
  }
}

export function decodeAttestation(validationResult: string) {
  const attestation = JSON.parse(validationResult);

  const pcr0 = Buffer.from(attestation.pcrs['0'], 'base64').toString('hex');
  const nonce = Buffer.from(attestation.nonce, 'base64').toString('hex');
  const { appKeyHashBytes } = deserializeNitridingPayload(
    Buffer.from(attestation.user_data, 'base64'),
  );

  const b64PublicKeyDigest = Buffer.from(appKeyHashBytes).toString('base64');

  return { pcr0, nonce, b64PublicKeyDigest };
}
