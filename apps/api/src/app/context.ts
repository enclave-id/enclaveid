import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { prisma } from './services/prisma';
import { FastifyReply } from 'fastify';

async function setJwtCookie(user: { id: string }, reply: FastifyReply) {
  const token = await reply.jwtSign({ user: { id: user.id } });

  reply.setCookie('token', token, {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: true,
  });
  // .code(200)
  // .send();
}

export function createAppContext({
  req,
  res: reply,
}: CreateFastifyContextOptions) {
  const user = req.user || {
    id: null,
  };

  return { setJwtCookie: (user) => setJwtCookie(user, reply), user, prisma };
}

export type AppContext = Awaited<ReturnType<typeof createAppContext>>;
