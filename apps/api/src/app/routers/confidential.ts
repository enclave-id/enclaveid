import { z } from 'zod';
import { AppContext } from '../context';
import { authenticatedProcedure, router } from '../trpc';
import { encryptResponsePayload } from '../services/crypto/symmetricNode';

export const confidential = router({
  ocean: authenticatedProcedure
    .input(
      z.object({
        nonce: z.string(),
      }),
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
