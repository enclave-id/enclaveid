import { ReactElement } from 'react';
import { trpc } from '../../utils/trpc';
import { PersonalityContentProps } from '../PersonalityContent';
import React from 'react';

export function PersonalityContainer({
  children,
}: {
  children: ReactElement<PersonalityContentProps>;
}) {
  const personalityQuery = trpc.private.getPersonalityTraits.useQuery();

  trpc.private.randomNumber.useSubscription(undefined, {
    onData(n) {
      console.log(n);
    },
  });

  const { isLoading, error } = personalityQuery;
  const { bigfive, sixteenPersonalityFactor, mbti } =
    personalityQuery.data || {};

  // TODO: Fix types
  return React.cloneElement(children, {
    // bigFive: bigfive,
    // sixteenPersonalityFactor: sixteenPersonalityFactor,
    // mbti: mbti,
  });
}
