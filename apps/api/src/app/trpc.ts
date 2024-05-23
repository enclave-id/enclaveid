import { TRPCError, initTRPC } from '@trpc/server';
import { AppContext } from './context';
import { prisma } from '@enclaveid/backend';

const t = initTRPC.create();

export const middleware = t.middleware;
export const router = t.router;
export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(async (opts) => {
  const { user } = opts.ctx as AppContext;

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User cookie not provided.',
    });
  }

  const userRecord = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!userRecord) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found.' });
  }

  return opts.next(opts);
});
