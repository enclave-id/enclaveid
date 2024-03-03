import { decode } from 'cbor-x/decode';
import { base64ToUint8array } from './typeConversion';

export function decodeAttestation(base64Attestation: string) {
  const cborBytes = base64ToUint8array(base64Attestation);

  const cose = decode(cborBytes);

  const attestation = decode(cose);

  const pcr0 = Buffer.from(attestation.pcrs['0']).toString('hex');
  const nonce = Buffer.from(attestation.nonce).toString('hex');
  const publicKeyDigest = Buffer.from(attestation.public_key).toString('hex');

  return { pcr0, nonce, publicKeyDigest };
}
