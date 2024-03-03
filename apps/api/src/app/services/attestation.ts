import axios from 'axios';
import { mockAttestation } from './mocks';

export async function getBase64Cbor(nonce: string) {
  if (process.env.NODE_ENV === 'development') return mockAttestation;

  return await axios.get(
    'https://192.168.127.2/enclave/attestation?nonce=' + nonce
  );
}
