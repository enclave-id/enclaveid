import { CustomFastifyInstance } from '../types';

export default async function (fastify: CustomFastifyInstance) {
  fastify.post<{
    Reply: { userId: string };
  }>(
    '/confidential',
    {
      onRequest: [fastify.authenticate],
    },
    (request, reply) => {
      const {
        body: { nonce, encryptedData },
      } = request;

      const { action, payload } =
        // TODO types
        reply.send({ userId: (request as any).userId });
    }
  );

  fastify.post<{
    Reply: { userId: string };
  }>(
    '/confidential',
    {
      onRequest: [fastify.authenticate],
    },
    (request, reply) => {
      const {
        body: { nonce, encryptedData },
      } = request;

      const { action, payload } =
        // TODO types
        reply.send({ userId: (request as any).userId });
    }
  );
}
