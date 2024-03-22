import { CompassSection } from './CompassSection';
import { MFTSection } from './MFTSection';

function PoliticsContent() {
  return (
    <div className="grid min-[1150px]:grid-cols-2 grid-cols-1 gap-5 mt-3.5">
      <CompassSection />
      <MFTSection />
    </div>
  );
}

export { PoliticsContent };
