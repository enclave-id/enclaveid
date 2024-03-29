import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { prisma } from './services/prisma';
import { FastifyReply } from 'fastify';
import { UserCookie } from './types/fastify';

async function setJwtCookie(user: UserCookie, reply: FastifyReply) {
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
  const user = (req.user || {
    id: null,
  }) as UserCookie;

  return {
    setJwtCookie: (user: UserCookie) => setJwtCookie(user, reply),
    logger: req.log,
    user,
    prisma,
  };
}

export type AppContext = Awaited<ReturnType<typeof createAppContext>>;
