import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import crypto from 'crypto';

export default fp(async (fastify: FastifyInstance) => {
  fastify.decorate('decryptRequest', async (request, reply) => {
    if (request.method === 'POST') {
      const { nonce, encryptedPayload } = request.body;

      if (!nonce || !encryptedPayload) {
        reply.code(400).send({ error: 'Invalid payload' });
        return;
      }

      // Retrieve the session key from the Prisma user session
      const sessionKey = await fastify.prisma.user
        .findUnique({
          where: { id: request.user },
          select: { session: { select: { sessionKey: true } } },
        })
        .then((user) => user?.session?.sessionKey);

      if (!sessionKey) {
        reply.code(401).send({ error: 'Invalid session' });
        return;
      }

      // Decrypt the payload using AES-CTR
      const decipher = crypto.createDecipheriv(
        'aes-256-ctr',
        sessionKey,
        nonce
      );
      let decryptedPayload = decipher.update(encryptedPayload, 'hex', 'utf8');
      decryptedPayload += decipher.final('utf8');

      // Parse the decrypted payload as JSON
      try {
        request.body = JSON.parse(decryptedPayload);
      } catch (error) {
        reply.code(400).send({ error: 'Invalid payload' });
        return;
      }
    }
  });
});
