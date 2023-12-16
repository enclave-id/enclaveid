import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import crypto from 'crypto';

export default fp(async (fastify: FastifyInstance) => {
  fastify
    .register(jwt, {
      secret: crypto.randomBytes(32).toString('hex'),
      cookie: {
        cookieName: 'token',
        signed: false,
      },
      sign: {
        expiresIn: '7d',
      },
    })
    .decorate('authenticate', async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    });
});
