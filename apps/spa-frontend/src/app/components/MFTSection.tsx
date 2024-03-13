import { Drawer } from 'vaul';
import { Button } from './Button';
import { MFTChart } from './MFTChart';
import { MFTChartData } from './mock-data';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useBreadcrumb } from '../context/BreadcrumbContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimilarProfileBadge } from './SimilarProfileBadge';

function MFTSection() {
  let navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { setLink } = useBreadcrumb();
  const { description, ...circles } = MFTChartData;

  const handleClick = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 640) {
      setLink('MFT');
      navigate(`/dashboard/politics/mft`, {
        state: { circles, description },
      });
    } else {
      setIsDrawerOpen(true);
    }
  };
  console.log(MFTChartData);
  return (
    <>
      <div className="flex flex-col gap-2.5 items-center">
        <h2 className="text-lg text-passiveLinkColor text-center leading-[22px]">
          MFT
        </h2>
        <div className="border border-[#E5E8EE] flex flex-col gap-3 items-center justify-center rounded-3xl w-full pt-7 pb-3.5 px-3">
          <MFTChart {...MFTChartData} />
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
                    Moral Foundations Theory
                  </Drawer.Title>
                  <button onClick={() => setIsDrawerOpen(false)}>
                    <ChevronDownIcon className="text-passiveLinkColor w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col gap-7">
                  <h2 className="text-passiveLinkColor text-lg leadig-[22px] font-medium">
                    Your Results
                  </h2>
                  <div className="-mt-1 flex flex-col gap-[5px]">
                    <p className="text-passiveLinkColor leading-[22px] max-w-[369px]">
                      {MFTChartData.description}
                    </p>
                    <div className="md:max-w-[369px] max-w-full w-full py-[13px] bg-[#F3F5F7] rounded-xl text-passiveLinkColor text-[32px] leading-[38px] text-center flex items-center justify-center">
                      Moderate
                    </div>
                  </div>
                  <div className="gap-9 flex flex-col overflow-y-auto items-center">
                    <MFTChart {...MFTChartData} />
                    <div className="mt-3 mb-8 w-full">
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

export { MFTSection };
