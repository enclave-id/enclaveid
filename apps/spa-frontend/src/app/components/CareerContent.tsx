import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import RadarChart, { RadarChartProps } from './RadarChart';
import { useBreadcrumb } from '../context/BreadcrumbContext';
import { useState } from 'react';
import { radarChart } from './mock-data';
import { Drawer } from 'vaul';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SimilarProfileBadge } from './SimilarProfileBadge';

export const findHighestValues = (props: RadarChartProps): string[] => {
  const highestKeys: string[] = [];
  let highestValue = 0;

  Object.entries(props.values).forEach(([key, value]) => {
    if (value > highestValue) {
      highestValue = value;
      highestKeys.length = 0;
      highestKeys.push(key);
    } else if (value === highestValue) {
      highestKeys.push(key);
    }
  });

  if (highestKeys.length > 1) {
    highestKeys[0] += ',';
  }

  return highestKeys;
};

function CareerContent() {
  let navigate = useNavigate();
  const { setLink } = useBreadcrumb();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClick = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 640) {
      setLink('Radar');
      navigate(`/dashboard/career/radar`, {
        state: { radarChart },
      });
    } else {
      setIsDrawerOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2.5 items-center mt-3.5 max-w-[538px]">
        <h2 className="text-lg text-passiveLinkColor text-center leading-[22px]">
          RIASEC
        </h2>
        <div className="border border-[#E5E8EE] flex flex-col gap-10 items-center justify-center rounded-3xl w-full pt-[30px] pb-3.5 px-3">
          <RadarChart values={radarChart.values} />
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
                    RIASEC
                  </Drawer.Title>
                  <button onClick={() => setIsDrawerOpen(false)}>
                    <ChevronDownIcon className="text-passiveLinkColor w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col gap-7">
                  <h2 className="text-passiveLinkColor text-lg leadig-[22px] font-medium">
                    Your Results
                  </h2>
                  <p className="text-center text-lg font-medium leading-[22px] text-passiveLinkColor">
                    Strongest trait{' '}
                    {findHighestValues(radarChart).length > 1 ? 'are' : 'is'}{' '}
                    {findHighestValues(radarChart).map((item, index) => (
                      <span
                        key={index}
                        className="capitalize text-[#4A83F3] font-normal"
                      >
                        {item}{' '}
                      </span>
                    ))}
                  </p>
                  <p className="text-[#7A818A] leading-[22px] font-normal">
                    {radarChart.description}
                  </p>
                  <div className="gap-9 flex flex-col items-center justify-center overflow-y-auto">
                    <RadarChart values={radarChart.values} />

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

export { CareerContent };
