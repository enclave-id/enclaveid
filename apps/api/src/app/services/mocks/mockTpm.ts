import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sampleAttestationToken } from './sampleAttestationToken';

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

export function getPublicKey() {
  return publicKey;
}

export function decrypt(encryptedText: string) {
  return crypto
    .privateDecrypt(privateKey, Buffer.from(encryptedText, 'base64'))
    .toString();
}

export function getAttestation(nonce: string) {
  sampleAttestationToken['x-ms-runtime']['client-payload']['nonce'] = nonce;

  sampleAttestationToken['x-ms-runtime']['keys'].forEach((key) => {
    key['TpmEphemeralEncryptionKey'] = publicKey;
  });

  // We use the same privateKey for signing the token as we use for decrypting.
  // This is not how it works in production.
  return jwt.sign(sampleAttestationToken, privateKey, {
    algorithm: 'RS256',
  });
}
