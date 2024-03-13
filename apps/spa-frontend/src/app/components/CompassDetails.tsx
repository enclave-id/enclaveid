import { useLocation } from 'react-router-dom';
import CompassChart from './CompassChart';
import { SimilarProfileBadge } from './SimilarProfileBadge';

function CompassDetails() {
  const location = useLocation();
  const { compassChartData } = location.state;
  return (
    <div className="flex flex-col gap-7 max-w-4xl">
      <h2 className="text-passiveLinkColor text-lg leadig-[22px] font-medium">
        Your Results
      </h2>
      <div className="gap-9 flex flex-col overflow-y-auto">
        <CompassChart {...compassChartData} showDescription={true} />
        <div className="mt-3 mb-8 max-w-max">
          <SimilarProfileBadge peopleCount={253} />
        </div>
      </div>
    </div>
  );
}

export { CompassDetails };
