import { IntjCard } from './IntjCard';
import { TraitCard1 } from './TraitCard1';
import { TraitCard2 } from './TraitCard2';
import { traitCard1, traitCard2 } from './mock-data';

function PersonalityContent() {
  return (
    <div className="pt-3.5 px-6 pb-9">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-3.5">
          <TraitCard1 title={'Ocean'} data={traitCard1} />
          <IntjCard
            header="MBTI"
            title="INTJ"
            description="Introverted, Intuitive, Thinking and Judging. 
It indicates a person who is energized by spending time alone, prioritizes ideas and concepts over facts and details, makes decisions based on logic and reason and prefers to be spontaneous and flexible."
          />
        </div>
        <TraitCard2 title={'16FP'} data={traitCard2} />
      </div>
    </div>
  );
}

export { PersonalityContent };
