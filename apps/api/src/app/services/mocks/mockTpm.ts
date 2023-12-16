import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

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
  const attestation = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, 'mocks', 'sampleAttestationToken.json'),
      'utf8'
    )
  );

  attestation['x-ms-runtime']['client-payload']['nonce'] = nonce;

  return jwt.sign(attestation, publicKey, { algorithm: 'RS256' });
}
