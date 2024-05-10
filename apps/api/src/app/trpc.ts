import { TRPCError, initTRPC } from '@trpc/server';
import { AppContext } from './context';
import { prisma } from './services/prisma';

const t = initTRPC.create();

export const middleware = t.middleware;
export const router = t.router;
export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(async (opts) => {
  const { user } = opts.ctx as AppContext;

  const userRecord = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!userRecord) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
  }

  return opts.next(opts);
});
