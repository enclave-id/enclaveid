import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get<{
    Querystring: {
      email: string;
      confirmationCode: string;
    };
  }>('/confirmation', async (request, reply) => {
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
