import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import {
  decryptRequestPayload,
  encryptResponsePayload,
} from '../services/crypto/symmetricNode';
import { TRPC_PREFIX, TRPC_PRIVATE_NAMESPACE } from '@enclaveid/shared';

export default fp(async (fastify: FastifyInstance) => {
  if (process.env.ENABLE_CONFIDENTIALITY !== 'true') return;

  fastify.addHook('preHandler', async (request) => {
    if (
      request.url.startsWith(`${TRPC_PREFIX}/${TRPC_PRIVATE_NAMESPACE}.`) &&
      request.method === 'POST'
    ) {
      const userId = request.user.id;

      const { encryptedPayload, nonce } = JSON.parse(request.body as string);

      request.body = await decryptRequestPayload(
        userId,
        encryptedPayload,
        nonce,
      );
    }
  });

  fastify.addHook('onSend', async (request, reply, payload) => {
    if (
      request.url.startsWith(`${TRPC_PREFIX}/${TRPC_PRIVATE_NAMESPACE}.`) &&
      ['POST', 'GET'].includes(request.method)
    ) {
      const userId = request.user.id;

      // TODO
      const newPayload = await encryptResponsePayload(userId, payload);

      return JSON.stringify(newPayload);
    } else {
      return payload;
    }
  });
});
