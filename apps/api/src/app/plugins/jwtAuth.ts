import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { TRPC_PREFIX, TRPC_PRIVATE_NAMESPACE } from '@enclaveid/shared';

export default fp(async (fastify: FastifyInstance) => {
  fastify
    .register(jwt, {
      secret: 'changeme', // TODO
      cookie: {
        cookieName: 'token',
        signed: false,
      },
    })
    .addHook('onRequest', async (request, reply) => {
      if (request.url.startsWith(`${TRPC_PREFIX}/${TRPC_PRIVATE_NAMESPACE}.`))
        try {
          // This one sets request.user = cookie payload
          await request.jwtVerify();
        } catch (err) {
          reply.send(err);
        }
    });
});
