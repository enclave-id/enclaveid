import { z } from 'zod';
import { AppContext } from '../context';
import { publicProcedure, router } from '../trpc';
import { encryptResponsePayload } from '../services/symmetricCrypto';

export const confidential = router({
  ocean: publicProcedure
    .input(
      z.object({
        nonce: z.string(),
      })
    )
    .query(async (opts) => {
      const {
        prisma,
        user: { id: userId },
      } = opts.ctx as AppContext;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { userTraits: { include: { bigFive: true } } },
      });

      const bigFive = user?.userTraits?.bigFive;

      return await encryptResponsePayload(userId, bigFive);
    }),
});
