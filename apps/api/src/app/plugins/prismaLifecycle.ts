import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { prisma } from '../services/prisma';

export default fp(async (fastify: FastifyInstance) => {
  await prisma.$connect();

  fastify.addHook('onClose', async (server) => {
    server.log.info('disconnecting Prisma from DB');
    await prisma.$disconnect();
  });
});
