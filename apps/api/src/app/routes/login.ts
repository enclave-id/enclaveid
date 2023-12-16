import { FastifyInstance } from 'fastify';
import * as tpm from '../services/tpm';

interface RequestBody {
  email: string;
  password: string;
  encryptedSessionKey: string;
}

export default async function (fastify: FastifyInstance) {
  fastify.post<{
    Body: RequestBody;
  }>('/login', async (request, reply) => {
    const { email, password, encryptedSessionKey } = request.body;

    const user = await fastify.prisma.user.findUnique({
      where: { email, password, confirmed: true },
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

    const token = await reply.jwtSign({ userId: user.id });

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
