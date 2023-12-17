import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import crypto from 'crypto';

export default fp(async (fastify: FastifyInstance) => {
  fastify.decorate('encryptResponse', async (request, reply) => {
    if (request.method === 'GET') {
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

      // Encrypt the payload using AES-CTR
      const nonce = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-ctr', sessionKey, nonce);
      let encryptedPayload = cipher.update(
        JSON.stringify(reply.sent),
        'utf8',
        'hex'
      );
      encryptedPayload += cipher.final('hex');

      reply.header('Content-Type', 'application/json');
      reply.send({ nonce: nonce.toString('hex'), encryptedPayload });
    }
  });
});
