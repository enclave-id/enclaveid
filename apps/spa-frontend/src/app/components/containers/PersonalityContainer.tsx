import React, { ReactElement } from 'react';
import { trpc } from '../../utils/trpc';
import { PersonalityContentProps } from '../PersonalityContent';

export function PersonalityContainer({
  children,
}: {
  children: ReactElement<PersonalityContentProps>;
}) {
  const personalityQuery = trpc.private.getPersonalityTraits.useQuery();

  console.log(personalityQuery.data);

  // const { bigfive, sixteenPersonalityFactor, mbti } =
  //   personalityQuery.data ?? {};

  // const sixteenPFDataArray = getDisjointSetShallow(
  //   sixteenPersonalityFactor,
  //   userTraitsShared,
  // );

  return React.cloneElement(children, {
    // bigFive: bigfive,
    // sixteenPersonalityFactor: {
    //   title: '16FP',
    //   data: sixteenPersonalityFactor,
    // },
    // mbti,
  });
}
