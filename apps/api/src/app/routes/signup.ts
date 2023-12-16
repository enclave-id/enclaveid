import { FastifyInstance } from 'fastify';
import * as tpm from '../services/tpm';

interface RequestBody {
  encryptedCredentials: string;
}

export default async function (fastify: FastifyInstance) {
  fastify.post<{
    Body: RequestBody;
  }>('/signup', async (request, reply) => {
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
