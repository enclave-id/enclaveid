import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { createAppContext } from '../context';
import { appRouter } from '../router';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: appRouter, createContext: createAppContext },
  });
});
