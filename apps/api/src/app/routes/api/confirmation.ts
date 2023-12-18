import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { genericResponseSchema } from '../../types/schema/custom';

const schema = {
  querystring: z.object({
    email: z.string(),
    confirmationCode: z.string(),
  }),
  response: genericResponseSchema,
};

export default async function (fastify: FastifyInstance) {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get('/confirmation', { schema }, async (request, reply) => {
      const { email, confirmationCode } = request.query;

      const user = await fastify.prisma.user.findUnique({
        where: { email, confirmationCode },
      });

      if (!user) {
        return reply.status(400).send({
          error: 'Invalid confirmation code',
        });
      }

      await fastify.prisma.user.update({
        where: { id: user.id },
        data: { confirmedAt: new Date() },
      });

      return reply.send({
        success: true,
      });
    });
}
