import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../trpc';
import { AppContext } from '../context';
import { provisionChrome } from '../services/kubernetes';

export const guacamole = router({
  provisionChrome: publicProcedure.mutation(async (opts) => {
    const {
      user: { id: userId },
    } = opts.ctx as AppContext;

    let podId;

    try {
      podId = await provisionChrome(userId);
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      });
    }

    return { podId };
  }),
});
