import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import helmet from '@fastify/helmet';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(helmet, { contentSecurityPolicy: false });
});
