import { decode } from 'cbor-x/decode';
import { base64ToUint8array } from './typeConversion';

function deserialize(userData: Uint8Array) {
  const hashPrefixSize = 7; // Size of hashPrefix
  const hashSize = 32; // Size of SHA-256 hash

  // Extract tlsKeyHash
  const tlsKeyHashStart = hashPrefixSize;
  const tlsKeyHashEnd = tlsKeyHashStart + hashSize;
  const tlsKeyHashBytes = userData.slice(tlsKeyHashStart, tlsKeyHashEnd);

  // Extract appKeyHash
  const appKeyHashStart = tlsKeyHashEnd + hashPrefixSize + 1;
  const appKeyHashEnd = appKeyHashStart + hashSize;
  const appKeyHashBytes = userData.slice(appKeyHashStart, appKeyHashEnd);

  return { tlsKeyHashBytes, appKeyHashBytes };
}

export function decodeAttestation(base64Attestation: string) {
  const cborBytes = base64ToUint8array(base64Attestation);
  const cose = decode(cborBytes);
  const attestation = decode(cose);

  const pcr0 = Buffer.from(attestation.pcrs['0']).toString('hex');
  const nonce = Buffer.from(attestation.nonce).toString('hex');
  const { appKeyHashBytes } = deserialize(attestation.user_data);

  const b64PublicKeyDigest = Buffer.from(appKeyHashBytes).toString('base64');

  return { pcr0, nonce, b64PublicKeyDigest };
}
