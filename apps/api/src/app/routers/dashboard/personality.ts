import { prisma } from '@enclaveid/backend';
import { AppContext } from '../../context';
import { authenticatedProcedure, router } from '../../trpc';
import { z } from 'zod';
import { getTipiScores } from '../../services/traits/bigFive';

export const personality = router({
  getPersonalityTraits: authenticatedProcedure.query(async (opts) => {
    const {
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
        tipiAnswers: z.record(z.string(), z.string()),
      }),
    )
    .mutation(async (opts) => {
      const {
        user: { id: userId },
      } = opts.ctx as AppContext;

      const { tipiAnswers } = opts.input;

      const normalizedScores = getTipiScores(tipiAnswers);

      return await prisma.bigFive.create({
        data: {
          ...normalizedScores,
          userTraits: {
            connectOrCreate: {
              where: {
                userId,
              },
              create: {
                userId,
              },
            },
          },
        },
      });
    }),
});
