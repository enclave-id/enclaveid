import { FastifyInstance } from 'fastify';
import * as tpm from '../services/tpm';
import { genericResponseSchema } from '../types/schema';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

const schema = {
  body: z.object({
    email: z.string(),
    password: z.string(),
    encryptedSessionKey: z.string(),
  }),
  response: genericResponseSchema,
};

export default async function (fastify: FastifyInstance) {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post('/login', { schema }, async (request, reply) => {
      const { email, password, encryptedSessionKey } = request.body;

      const user = await fastify.prisma.user.findUnique({
        where: { email, password, confirmedAt: { not: null } },
      });

      if (!user) {
        reply.code(401).send();
        return;
      }

      const sessionKey = tpm.decrypt(encryptedSessionKey);

      await fastify.prisma.session.upsert({
        where: { userId: user.id },
        update: { sessionKey },
        create: { userId: user.id, sessionKey },
      });

      const token = await reply.jwtSign({ user: { id: user.id } });

      reply
        .setCookie('token', token, {
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: true,
        })
        .code(200)
        .send();
    });
}
