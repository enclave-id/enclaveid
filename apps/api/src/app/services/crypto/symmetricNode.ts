import { prisma } from '../prisma';
import crypto from 'crypto';

export async function encryptResponsePayload(
  userId: string,
  payload: Record<string, unknown>,
): Promise<{
  encryptedPayload: string;
  nonce: string;
}> {
  const sessionKey = await prisma.user
    .findUnique({
      where: { id: userId },
      select: { session: { select: { sessionKey: true } } },
    })
    .then((user) => user?.session?.sessionKey);

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
): Promise<{
  payload: Record<string, unknown>;
}> {
  const sessionKey = await prisma.user
    .findUnique({
      where: { id: userId },
      select: { session: { select: { sessionKey: true } } },
    })
    .then((user) => user?.session?.sessionKey);

  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    sessionKey,
    Buffer.from(nonce, 'hex'),
  );
  const payload =
    decipher.update(encryptedPayload, 'hex', 'utf8') + decipher.final('utf8');

  return {
    payload: JSON.parse(payload),
  };
}
