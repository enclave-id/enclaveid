import { prisma } from '@enclaveid/backend';
import { AppContext } from '../../context';
import { authenticatedProcedure, router } from '../../trpc';
import { z } from 'zod';

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
        mfq20Answers: z.record(z.string(), z.string()),
      }),
    )
    .mutation(async (opts) => {
      const {
        user: { id: userId },
      } = opts.ctx as AppContext;

      const { care, fairness, loyalty, authority, sanctity } = opts.input;

      const moralFoundations = await prisma.moralFoundation.create({
        data: {
          care,
          fairness,
          loyalty,
          authority,
          sanctity,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return moralFoundations;
    }),
});
