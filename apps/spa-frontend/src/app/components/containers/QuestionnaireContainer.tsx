import { ReactElement, useEffect } from 'react';
import { StepFormProps } from '../StepForm';
import React from 'react';
import { trpc } from '../../utils/trpc';
import { QuestionnaireId, questionnaires } from '@enclaveid/shared';

export function QuestionnaireContainer({
  onSkipAll,
  children,
}: {
  onSkipAll: () => void;
  children: ReactElement<StepFormProps>;
}) {
  const personalityQuery = trpc.private.getPersonalityTraits.useQuery();
  const politicsQuery = trpc.private.getPoliticsTraits.useQuery();

  const createbigFiveMutation = trpc.private.createbigFive.useMutation();
  const createMoralFoundationsMutation =
    trpc.private.createMoralFoundations.useMutation();

  const [onSkip, setOnSkip] = React.useState<StepFormProps['onSkip']>();
  const [onFinished, setOnFinished] =
    React.useState<StepFormProps['onFinished']>();
  const [whichQuestionnaire, setWhichQuestionnaire] =
    React.useState<QuestionnaireId>('TIPI');

  useEffect(() => {
    if (personalityQuery.error || politicsQuery.error) return;

    if (personalityQuery.isLoading || politicsQuery.isLoading) return;

    if (!personalityQuery.data?.bigfive) {
      setWhichQuestionnaire('TIPI');
      setOnSkip(() => {
        setWhichQuestionnaire('MFQ20');
      });
      setOnFinished((answers) => {
        createbigFiveMutation.mutate({
          tipiAnswers: answers,
        });
        setWhichQuestionnaire('MFQ20');
      });
    } else if (
      personalityQuery.data?.bigfive &&
      !politicsQuery.data?.moralFoundations
    ) {
      setWhichQuestionnaire('MFQ20');
      setOnSkip(() => {
        onSkipAll();
      });
      setOnFinished((answers) => {
        createMoralFoundationsMutation.mutate(answers);
      });
    } else {
      onSkipAll();
    }
  }, [
    createMoralFoundationsMutation,
    createbigFiveMutation,
    onSkipAll,
    personalityQuery.data,
    personalityQuery.error,
    personalityQuery.isLoading,
    politicsQuery.data,
    politicsQuery.error,
    politicsQuery.isLoading,
  ]);

  return React.cloneElement(children, {
    questionnaire: questionnaires.find(
      (questionnaire) => questionnaire.id === whichQuestionnaire,
    ),
    onFinished: onFinished,
    onSkip: onSkip,
  });
}
