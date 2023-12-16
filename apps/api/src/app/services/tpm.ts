import crypto from 'crypto';
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

export function getAttestation(encryptedChallenge: string) {
  const nonce = crypto
    .createHash('sha256')
    .update(decrypt(encryptedChallenge))
    .digest('hex');

  if (process.env.NODE_ENV === 'development') {
    return mocks.getAttestation(nonce);
  } else {
    throw new Error('Not implemented');
  }
}
