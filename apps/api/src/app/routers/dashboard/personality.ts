import { prisma } from '@enclaveid/backend';
import { AppContext } from '../../context';
import { authenticatedProcedure, router } from '../../trpc';
import { z } from 'zod';
import { questionnaires } from '@enclaveid/shared';

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

      const reverseScoredItems = [1, 3, 5, 7, 9];

      const { options, questions } = questionnaires.find(
        (questionnaire) => questionnaire.id === 'TIPI',
      ).parts[0];

      const scores = Object.entries(tipiAnswers).reduce(
        (acc, [question, answer]) => {
          const questionIndex = questions.indexOf(question);

          const score = reverseScoredItems.includes(questionIndex)
            ? 8 - options.indexOf(answer)
            : options.indexOf(answer) + 1;

          let key;
          switch (questionIndex) {
            case 0:
            case 5:
              key = 'extraversion';
              break;
            case 1:
            case 6:
              key = 'agreeableness';
              break;
            case 2:
            case 7:
              key = 'conscientiousness';
              break;
            case 3:
            case 8:
              key = 'neuroticism';
              break;
            case 4:
            case 9:
              key = 'openness';
              break;
          }

          return {
            ...acc,
            [key]: acc[key] ? (acc[key] + score) / 2 : score,
          };
        },
        {} as Record<string, number>,
      );

      const normalizedScores = Object.entries(scores).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: (value - 1) / 6,
        }),
        {} as Record<string, number>,
      );

      return await prisma.bigFive.create({
        data: {
          openness: normalizedScores.openness,
          conscientiousness: normalizedScores.conscientiousness,
          extraversion: normalizedScores.extraversion,
          agreeableness: normalizedScores.agreeableness,
          neuroticism: normalizedScores.neuroticism,
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
