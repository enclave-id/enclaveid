import { useState } from 'react';
import { Button } from './Button';
import CompassChart from './CompassChart';
import { useBreadcrumb } from '../context/BreadcrumbContext';
import { useNavigate } from 'react-router-dom';
import { compassChartData } from './mock-data';
import { SimilarProfileBadge } from './SimilarProfileBadge';
import { CustomDrawer } from './CustomDrawer';
import classNames from 'classnames';

function CompassSection() {
  const navigate = useNavigate();
  const { setLink } = useBreadcrumb();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 640) {
      setLink('Compass');
      navigate(`/dashboard/politics/compass`, {
        state: { compassChartData },
      });
    } else {
      setIsDrawerOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2.5 items-center">
        <h2 className="text-lg text-passiveLinkColor text-center leading-[22px]">
          Compass
        </h2>

        <div
          className={classNames(
            'border border-[#E5E8EE] flex flex-col gap-10 items-center justify-center flex-1 rounded-3xl w-full relative overflow-hidden ',
            loading ? '' : 'pt-[30px] pb-3.5 px-3',
          )}
        >
          {loading ? (
            <div className="flex flex-col w-full h-full items-center justify-centerrelative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent min-h-[454px]">
              <div className="flex flex-col gap-6 justify-between flex-1 w-full items-center pt-[30px] pb-3.5">
                <div className="flex flex-col gap-6">
                  <div className="h-6 w-[270px] bg-gray-200/50"></div>
                  <div className="w-[264px] h-[264px] bg-gray-200/50"></div>
                </div>
                <div className="px-3 w-full">
                  <div className=" w-full h-9 bg-gray-200/50"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <CompassChart {...compassChartData} />
              {compassChartData.compassChartAvailable && (
                <Button
                  label="Dive Deeper"
                  variant="tertiary"
                  fullWidth
                  onClick={handleClick}
                />
              )}
            </>
          )}
        </div>
      </div>
      <CustomDrawer
        title={'Compass'}
        isOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      >
        <div className="flex flex-col gap-7">
          <h2 className="text-passiveLinkColor text-lg leadig-[22px] font-medium">
            Your Results
          </h2>
          <div className="gap-9 flex flex-col overflow-y-auto">
            <CompassChart {...compassChartData} showDescription={true} />
            <div className="mt-3 mb-8">
              <SimilarProfileBadge peopleCount={253} />
            </div>
          </div>
        </div>
      </CustomDrawer>
      <button
        className="absolute border px-4 py-1.5 rounded-lg bottom-72"
        onClick={() => setLoading(!loading)}
      >
        Change Loading
      </button>
    </>
  );
}

export { CompassSection };
