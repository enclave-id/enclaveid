import { Button } from './Button';
import CompassChart from './CompassChart';
import { MFTChart } from './MFTChart';
import { MFTChartData } from './mock-data';

function PoliticsContent() {
  return (
    <div className="grid grid-cols-2 gap-5 mt-3.5">
      <div className="flex flex-col gap-2.5 items-center">
        <h2 className="text-lg text-passiveLinkColor text-center leading-[22px]">
          Compass
        </h2>
        <div className="border border-[#E5E8EE] flex flex-col gap-10 items-center justify-center rounded-3xl w-full pt-[30px] pb-3.5 px-3">
          <CompassChart x={2} y={4} />
          <Button label="Dive Deeper" variant="tertiary" fullWidth />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 items-center">
        <h2 className="text-lg text-passiveLinkColor text-center leading-[22px]">
          MFT
        </h2>
        <div className="border border-[#E5E8EE] flex flex-col gap-3 items-center justify-center rounded-3xl w-full pt-7 pb-3.5 px-3">
          <MFTChart {...MFTChartData} />
          <Button label="Dive Deeper" variant="tertiary" fullWidth />
        </div>
      </div>
    </div>
  );
}

export { PoliticsContent };
