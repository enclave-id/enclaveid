import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { prisma } from '@enclaveid/backend';

export default fp(async (fastify: FastifyInstance) => {
  await prisma.$connect();

  fastify.log.info('connected Prisma to DB');

  fastify.addHook('onClose', async (server) => {
    server.log.info('disconnecting Prisma from DB');
    await prisma.$disconnect();
  });
});
