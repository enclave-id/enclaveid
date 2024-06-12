import {
  Questionnaire,
  UserTraitsShared,
  questionnaires,
} from '@enclaveid/shared';
import { MoralFoundations } from '@prisma/client';

function getMfq20PartScores(
  mfq20Answers: Record<string, string>,
  part: Questionnaire['parts'][0],
) {
  const { options, questions } = part;

  const scores = Object.entries(mfq20Answers).reduce(
    (acc, [question, answer]) => {
      const questionIndex = questions.indexOf(question);
      const score = options.indexOf(answer);

      let key;
      switch (questionIndex) {
        case 0:
        case 6:
          key = 'careHarm';
          break;
        case 1:
        case 7:
          key = 'fairnessCheating';
          break;
        case 2:
        case 8:
          key = 'loyaltyBetrayal';
          break;
        case 3:
        case 9:
          key = 'authoritySubversion';
          break;
        case 4:
        case 10:
          key = 'sanctityDegradation';
          break;
        case 5:
          if (question === 'Whether or not someone was good at math.') {
            key = 'mathCheck';
          } else if (question === 'It is better to do good than to do bad.') {
            key = 'goodCheck';
          }
          break;
      }

      acc[key] = acc[key] ? acc[key] + score : score;

      return acc;
    },
    {} as Omit<MoralFoundations, keyof UserTraitsShared>,
  );

  return scores;
}

export function getMfq20Scores(mfq20Answers: Record<string, string>) {
  const normalizedScores = questionnaires
    .find((questionnaire) => questionnaire.id === 'MFQ20')
    .parts.map((part) => getMfq20PartScores(mfq20Answers, part))
    .reduce(
      (acc, partScores) => {
        Object.entries(partScores).forEach(([key, value]) => {
          const normalizedScore = value / 10;
          acc[key] = acc[key] ? acc[key] + normalizedScore : normalizedScore;
        });

        return acc;
      },
      {} as Omit<MoralFoundations, keyof UserTraitsShared>,
    );

  return normalizedScores;
}
