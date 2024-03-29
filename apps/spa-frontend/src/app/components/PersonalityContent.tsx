import { BigFive, Mbti } from '@prisma/client';
import { IntjCard } from './IntjCard';
import { TraitCard1 } from './TraitCard1';
import { intjCard, traitCard1, traitCard2 } from './mock-data';
import { SixteenPFCard, SixteenPFCardProps } from './SixteenPFCard';

export interface PersonalityContentProps {
  bigFive?: BigFive;
  sixteenPersonalityFactor?: SixteenPFCardProps;
  mbti?: Mbti;
}

function PersonalityContent(props: PersonalityContentProps) {
  return (
    <div className="pt-3.5 pb-9">
      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 gap-16 lg:gap-5">
        <div className="flex flex-col gap-16 sm:gap-3 lg:gap-3.5">
          <TraitCard1 {...traitCard1} />
          <IntjCard {...intjCard} />
        </div>
        <SixteenPFCard title={'16FP'} data={traitCard2} />
      </div>
    </div>
  );
}

export { PersonalityContent };
