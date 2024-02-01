import { TRPCError, initTRPC } from '@trpc/server';
import { AppContext } from './context';

const t = initTRPC.create();

export const middleware = t.middleware;
export const router = t.router;
export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use((opts) => {
  const { user } = opts.ctx as AppContext;

  if (!user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next(opts);
});
