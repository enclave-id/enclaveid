import { AppContext } from '../context';
import { authenticatedProcedure, router } from '../trpc';
import {
  decryptRequestPayload,
  encryptResponsePayload,
} from '../services/crypto/symmetricNode';
import { z } from 'zod';
import { BigFive } from '@prisma/client';

export const confidential = router({
  getAllTraits: authenticatedProcedure.query(async (opts) => {
    const {
      prisma,
      user: { id: userId },
    } = opts.ctx as AppContext;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { userTraits: { include: { bigFive: true } } },
    });

    const bigFive = user?.userTraits?.bigFive;

    return await encryptResponsePayload(userId, bigFive as any);
  }),

  createbigFive: authenticatedProcedure
    .input(
      z.object({
        nonce: z.string(),
        encryptedPayload: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const {
        prisma,
        user: { id: userId },
      } = opts.ctx as AppContext;

      const { encryptedPayload, nonce } = opts.input;

      const {
        openness,
        conscientiousness,
        extraversion,
        agreeableness,
        neuroticism,
      } = (await decryptRequestPayload(
        userId,
        encryptedPayload,
        nonce,
      )) as BigFive;

      const { id: userTraitsId } = await prisma.userTraits.findUnique({
        where: { userId: userId },
      });

      await prisma.bigFive.create({
        data: {
          userTraitsId,
          openness,
          conscientiousness,
          extraversion,
          agreeableness,
          neuroticism,
        },
      });
    }),
});
