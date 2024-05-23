import axios from 'axios';
import { mockAttestation } from './mocks';

export async function getBase64Cbor(nonce: string): Promise<string> {
  if (process.env.ENABLE_CONFIDENTIALITY !== 'true')
    return mockAttestation;

  return await axios
    .get('https://192.168.127.2/enclave/attestation?nonce=' + nonce)
    .then((response) => response.data);
}
