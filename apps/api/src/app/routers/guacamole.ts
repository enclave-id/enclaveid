import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const guacamole = router({
  newConnection: publicProcedure
    .input(
      z.object({
        nonce: z.string(),
      })
    )
    .mutation(() => {
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'Not implemented',
      });
    }),
});
