import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { getFastifyPlugin } from 'trpc-playground/handlers/fastify';
import { appRouter } from '../router';

export default fp(async (fastify: FastifyInstance) => {
  const playgorundPlugin = await getFastifyPlugin({
    trpcApiEndpoint: '/trpc',
    playgroundEndpoint: '/playground',
    router: appRouter,
  });

  fastify.register(playgorundPlugin, { prefix: '/playground' });
});
