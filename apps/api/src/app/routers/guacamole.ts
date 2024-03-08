import { TRPCError } from '@trpc/server';
import { authenticatedProcedure, router } from '../trpc';
import { AppContext } from '../context';

export const guacamole = router({
  provisionChrome: authenticatedProcedure.mutation(async (opts) => {
    const {
      user: { id: userId },
    } = opts.ctx as AppContext;

    throw new TRPCError({
      code: 'NOT_IMPLEMENTED',
      message: 'Not implemented',
    });
  }),
});
