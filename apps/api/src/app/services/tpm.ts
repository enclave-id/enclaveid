import * as mocks from './mocks/mockTpm';

export function getPublicKey() {
  if (process.env.NODE_ENV === 'development') {
    return mocks.getPublicKey();
  } else {
    throw new Error('Not implemented');
  }
}

export function decrypt(encryptedText: string) {
  if (process.env.NODE_ENV === 'development') {
    return mocks.decrypt(encryptedText);
  } else {
    throw new Error('Not implemented');
  }
}

export function getAttestation(nonce: string) {
  if (process.env.NODE_ENV === 'development') {
    return mocks.getAttestation(nonce);
  } else {
    throw new Error('Not implemented');
  }
}
