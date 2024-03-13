import { useLocation } from 'react-router-dom';
import { MFTChart } from './MFTChart';
import { SimilarProfileBadge } from './SimilarProfileBadge';

interface Props {
  circles: {
    harm: number;
    fairness: number;
    authority: number;
    ingroup: number;
    purity: number;
  };
  description: string;
}

function MFTDetails() {
  const location = useLocation();
  const { description, circles } = location.state as Props;

  return (
    <div className="flex flex-col gap-7 max-w-4xl">
      <h2 className="text-passiveLinkColor text-lg leadig-[22px] font-medium">
        Your Results
      </h2>
      <div className="-mt-1 flex flex-col gap-5">
        <p className="text-passiveLinkColor leading-[22px]">{description}</p>
        <div className="md:max-w-[369px] max-w-full w-full py-[13px] bg-[#F3F5F7] rounded-xl text-passiveLinkColor text-[32px] leading-[38px] text-center flex items-center justify-center">
          Moderate
        </div>
      </div>
      <div className="gap-9 flex flex-col overflow-y-auto">
        <MFTChart {...circles} />
        <div className="mt-3 mb-8 max-w-max">
          <SimilarProfileBadge peopleCount={253} />
        </div>
      </div>
    </div>
  );
}

export { MFTDetails };
