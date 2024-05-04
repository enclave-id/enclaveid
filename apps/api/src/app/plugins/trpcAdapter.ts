import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { createAppContext } from '../context';
import { appRouter } from '../router';
import { TRPC_PREFIX } from '@enclaveid/shared';
import ws from '@fastify/websocket';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(ws).register(fastifyTRPCPlugin, {
    prefix: TRPC_PREFIX,
    trpcOptions: { router: appRouter, createContext: createAppContext },
    useWSS: true,
  });
});
