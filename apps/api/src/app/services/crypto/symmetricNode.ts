import { prisma } from '../prisma';
import crypto from 'crypto';

export async function encryptResponsePayload(
  userId: string,
  payload: unknown,
): Promise<{
  encryptedPayload: string;
  nonce: string;
}> {
  const sessionKey = await prisma.user
    .findUnique({
      where: { id: userId },
      select: { session: { select: { sessionSecret: true } } },
    })
    .then((user) => user?.session?.sessionSecret);

  const nonce = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-ctr', sessionKey, nonce);
  const encryptedPayload =
    cipher.update(JSON.stringify(payload), 'utf8', 'hex') + cipher.final('hex');

  return {
    encryptedPayload,
    nonce: nonce.toString('hex'),
  };
}

export async function decryptRequestPayload(
  userId: string,
  encryptedPayload: string,
  nonce: string,
): Promise<string> {
  const sessionKey = await prisma.user
    .findUnique({
      where: { id: userId },
      select: { session: { select: { sessionSecret: true } } },
    })
    .then((user) => user?.session?.sessionSecret);

  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    sessionKey,
    Buffer.from(nonce, 'hex'),
  );
  return (
    decipher.update(encryptedPayload, 'hex', 'utf8') + decipher.final('utf8')
  );
}
