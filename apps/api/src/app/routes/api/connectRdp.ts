import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const schema = {
  response: {
    200: z.object({
      url: z.string(),
    }),
  },
};

export default async function (fastify: FastifyInstance) {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/connect-rdp',
      { onRequest: [fastify.authenticate], schema },
      async (request, reply) => {
        // TODO implement

        reply.send({
          url: '/example-url',
        });
      }
    );
}
