import { prisma } from '@enclaveid/backend';
import { AppContext } from '../../context';
import { authenticatedProcedure, router } from '../../trpc';
import { z } from 'zod';
import { getMfq20Scores } from '../../services/traits/moralFoundations';

export const politics = router({
  getPoliticsTraits: authenticatedProcedure.query(async (opts) => {
    const {
      user: { id: userId },
    } = opts.ctx as AppContext;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userTraits: {
          include: {
            politicalCompass: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
            moralFoundations: {
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
      politicalCompass: user?.userTraits?.politicalCompass[0],
      moralFoundations: user?.userTraits?.moralFoundations[0],
    };
  }),
  createMoralFoundations: authenticatedProcedure
    .input(
      z.object({
        answers: z.record(z.string(), z.string()),
      }),
    )
    .mutation(async (opts) => {
      const {
        user: { id: userId },
      } = opts.ctx as AppContext;

      const { answers } = opts.input;

      const normalizedScores = getMfq20Scores(answers);

      return await prisma.moralFoundations.create({
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
