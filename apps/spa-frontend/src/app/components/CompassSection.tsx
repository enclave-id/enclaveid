import { useState } from 'react';
import { Button } from './Button';
import CompassChart from './CompassChart';
import { useBreadcrumb } from '../context/BreadcrumbContext';
import { useNavigate } from 'react-router-dom';
import { compassChartData } from './mock-data';
import { Drawer } from 'vaul';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SimilarProfileBadge } from './SimilarProfileBadge';

function CompassSection() {
  let navigate = useNavigate();
  const { setLink } = useBreadcrumb();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        <div className="border border-[#E5E8EE] flex flex-col gap-10 items-center justify-center rounded-3xl w-full pt-[30px] pb-3.5 px-3">
          <CompassChart {...compassChartData} />
          <Button
            label="Dive Deeper"
            variant="tertiary"
            fullWidth
            onClick={handleClick}
          />
        </div>
      </div>
      <Drawer.Root
        shouldScaleBackground
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-xl max-h-[91%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="bg-white rounded-t-xl flex-1 flex overflow-auto">
              <div className="flex flex-col gap-5 w-full px-4">
                <div className="flex items-center justify-between py-4 px-5">
                  <span className="opacity-0"></span>
                  <Drawer.Title className="text-passiveLinkColor text-lg leading-[21px] font-semibold">
                    Compass
                  </Drawer.Title>
                  <button onClick={() => setIsDrawerOpen(false)}>
                    <ChevronDownIcon className="text-passiveLinkColor w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col gap-7">
                  <h2 className="text-passiveLinkColor text-lg leadig-[22px] font-medium">
                    Your Results
                  </h2>
                  <div className="gap-9 flex flex-col overflow-y-auto">
                    <CompassChart
                      {...compassChartData}
                      showDescription={true}
                    />
                    <div className="mt-3 mb-8">
                      <SimilarProfileBadge peopleCount={253} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

export { CompassSection };
