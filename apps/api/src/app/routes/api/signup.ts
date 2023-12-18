import { FastifyInstance } from 'fastify';
import * as tpm from '../../services/tpm';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { genericResponseSchema } from '../../types/schema/custom';

const schema = {
  body: z.object({
    encryptedCredentials: z.string(),
  }),
  response: genericResponseSchema,
};

export default async function (fastify: FastifyInstance) {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post('/signup', { schema }, async (request, reply) => {
      const { encryptedCredentials } = request.body;

      const { email, password } = JSON.parse(tpm.decrypt(encryptedCredentials));

      const existingUser = await fastify.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return reply.status(400).send({
          error: 'User already exists',
        });
      }

      const user = await fastify.prisma.user.create({
        data: {
          email,
          password,
        },
      });

      // TODO send confirmation email

      reply.send({
        success: true,
      });
    });
}
