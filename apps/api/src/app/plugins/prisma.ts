import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  await prisma.$connect();

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (server) => {
    server.log.info('disconnecting Prisma from DB');
    await server.prisma.$disconnect();
  });
});
