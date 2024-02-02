import * as mocks from './mocks/mockTpm';

export function decrypt(encryptedText: string) {
  if (process.env.NODE_ENV === 'development') {
    return mocks.decrypt(encryptedText);
  } else {
    throw new Error('Not implemented');
  }
}

export async function getAttestation(nonce: string) {
  if (process.env.NODE_ENV === 'development') {
    return await mocks.getAttestation(nonce);
  } else {
    throw new Error('Not implemented');
  }
}
