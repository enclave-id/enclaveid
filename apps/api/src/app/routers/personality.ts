import { AppContext } from '../context';
import { authenticatedProcedure, router } from '../trpc';
import { z } from 'zod';

export const confidential = router({
  getPersonalityTraits: authenticatedProcedure.query(async (opts) => {
    const {
      prisma,
      user: { id: userId },
    } = opts.ctx as AppContext;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userTraits: {
          include: {
            bigFive: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
            sixteenPersonalityFactor: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
            mbti: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
          },
        },
      },
    });

    return {
      bigfive: user?.userTraits?.bigFive[0],
      sixteenPersonalityFactor: user?.userTraits?.sixteenPersonalityFactor[0],
      mbti: user?.userTraits?.mbti[0],
    };
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

      // const {
      //   openness,
      //   conscientiousness,
      //   extraversion,
      //   agreeableness,
      //   neuroticism,
      // } = (await decryptRequestPayload(
      //   userId,
      //   encryptedPayload,
      //   nonce,
      // )) as BigFive;

      const { id: userTraitsId } = await prisma.userTraits.findUnique({
        where: { userId: userId },
      });

      // await prisma.bigFive.create({
      //   data: {
      //     userTraitsId,
      //     openness,
      //     conscientiousness,
      //     extraversion,
      //     agreeableness,
      //     neuroticism,
      //   },
      // });
    }),
});
