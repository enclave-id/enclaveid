import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(cors, {
    origin: (origin, cb) => {
      cb(null, true); // TODO Allow all origins for now
    },
    credentials: true,
  });
});
