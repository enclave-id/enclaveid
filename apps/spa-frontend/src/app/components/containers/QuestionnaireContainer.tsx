import { ReactElement, useEffect } from 'react';
import { StepFormProps } from '../StepForm';
import React from 'react';
import { trpc } from '../../utils/trpc';

export const questionnaires = [
  {
    id: 'TIPI',
    headline:
      'You should rate the extent to which the pair of traits applies to you, even if one characteristic applies more strongly than the other.',
    questions: [
      'I see myself as extraverted, enthusiastic.',
      'I see myself as critical, quarrelsome.',
      'I see myself as dependable, self-disciplined.',
      'I see myself as anxious, easily upset.',
      'I see myself as open to new experiences, complex.',
      'I see myself as reserved, quiet.',
      'I see myself as sympathetic, warm.',
      'I see myself as disorganized, careless.',
      'I see myself as calm, emotionally stable.',
      'I see myself as conventional, uncreative.',
    ],
    options: [
      'Disagree strongly',
      'Disagree moderately',
      'Disagree a little',
      'Neither agree nor disagree',
      'Agree a little',
      'Agree moderately',
      'Agree strongly',
    ],
  },
  {
    id: 'MFQ20P1',
    headline:
      'When you decide whether something is right or wrong, to what extent are the following considerations relevant to your thinking?',
    questions: [
      'Whether or not someone suffered emotionally.',
      'Whether or not some people were treated differently than others.',
      'Whether or not someone’s action showed love for his or her country',
      'Whether or not someone showed a lack of respect for authority.',
      'Whether or not someone violated standards of purity and decency.',
      'Whether or not someone was good at math.',
      'Whether or not someone cared for someone weak or vulnerable',
      'Whether or not someone acted unfairly',
      'Whether or not someone did something to betray his or her group',
      'Whether or not someone conformed to the traditions of society',
      'Whether or not someone did something disgusting',
    ],
    options: [
      'Not at all relevant',
      'Not very relevant',
      'Slightly relevant',
      'Somewhat relevant',
      'Very relevant',
      'Extremely relevant',
    ],
  },
  {
    id: 'MFQ20P2',
    headline:
      'Please read the following sentences and indicate your agreement or disagreement:',
    questions: [
      'Compassion for those who are suffering is the most crucial virtue.',
      'When the government makes laws, the number one principle should be ensuring the good of the people.',
      'I am proud of my country’s history.',
      'Respect for authority is something all children need to learn.',
      'People should not do things that are disgusting, even if no one is harmed.',
      'It is better to do good than to do bad.',
      'One of the worst things a person could do is hurt a defenseless animal.',
      'Justice is the most important requirement for a society.',
      'People should be loyal to their family members, even when they have done something wrong.',
      'Men and women each have different roles to play in society.',
      'I would call some acts wrong on the grounds that they are unnatural.',
    ],
    options: [
      'Strongly disagree',
      'Moderately disagree',
      'Slightly disagree',
      'Slightly agree',
      'Moderately agree',
      'Strongly agree',
    ],
  },
];

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

  const [onSkip, setOnSkip] = React.useState();
  const [onFinished, setOnFinished] = React.useState();
  const [whichQuestionnaire, setWhichQuestionnaire] = React.useState('TIPI');

  useEffect(() => {
    if (!personalityQuery.data?.bigfive) {
      setWhichQuestionnaire('TIPI');
      setOnSkip(() => {
        setWhichQuestionnaire('MFQ20');
      });
      setOnFinished((answers) => {
        createbigFiveMutation.mutate(answers);
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
    politicsQuery.data,
  ]);

  return React.cloneElement(children, {
    questions: questionnaires.find((q) => q.id === whichQuestionnaire)
      .questions,
    options: questionnaires.find((q) => q.id === whichQuestionnaire).options,
    onFinished: onFinished,
    onSkip: onSkip,
  });
}
