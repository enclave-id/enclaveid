import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = 'YourSecretKey'; // Replace with your own secret key
const iv = crypto.randomBytes(16);

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(encryptedText: string): string {
  const parts = encryptedText.split(':');
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(parts[0], 'hex')
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(parts[1], 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString('utf8');
}
