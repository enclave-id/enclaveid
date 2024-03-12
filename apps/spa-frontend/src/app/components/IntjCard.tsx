import { useState } from 'react';
import { Button } from './Button';
import { DashboardCardLayout } from './DashboardCardLayout';

import { useNavigate } from 'react-router-dom';
import { Drawer } from 'vaul';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SimilarProfileBadge } from './SimilarProfileBadge';
import { useBreadcrumb } from '../context/BreadcrumbContext';

interface IntjCardProps {
  header: string;
  label: string;
  description: string;
  data: {
    title: string;
    content: string;
  };
}

function IntjCard({ header, label, description, data }: IntjCardProps) {
  let navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { setLink } = useBreadcrumb();

  const handleClick = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 640) {
      setLink(label);
      navigate(`/dashboard/personality/mbti/${label.toLocaleLowerCase()}`, {
        state: { data, label },
      });
    } else {
      setIsDrawerOpen(true);
    }
  };
  return (
    <>
      <DashboardCardLayout withTitle title={header}>
        <div className="flex flex-col gap-4 sm:gap-[5px] px-4 sm:px-3 pt-8 sm:pt-[9px] pb-[15px] ">
          <h1 className="text-[64px] leading-[75px] text-[#30A78A] text-center">
            {label}
          </h1>
          <p className="text-[#6C7A8A] leading-[22px] sm:px-3 ">
            {description}
          </p>
          <div className="sm:mt-0 mt-4">
            <Button
              label="Dive Deeper"
              variant="tertiary"
              fullWidth
              onClick={handleClick}
            />
          </div>
        </div>
      </DashboardCardLayout>
      <Drawer.Root
        shouldScaleBackground
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-xl max-h-[91%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="bg-white rounded-t-xl flex-1 flex overflow-auto">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between py-4 px-5">
                  <span className="opacity-0"></span>
                  <Drawer.Title className="text-passiveLinkColor text-lg leading-[21px] font-semibold">
                    Myers-Briggs Type Indicator
                  </Drawer.Title>
                  <button onClick={() => setIsDrawerOpen(false)}>
                    <ChevronDownIcon className="text-passiveLinkColor w-5 h-5" />
                  </button>
                </div>
                <div className="gap-4 flex flex-col overflow-y-auto px-3">
                  <div className="flex flex-col gap-5">
                    <h2 className="text-passiveLinkColor text-lg leadig-[22px] font-medium">
                      Your Results
                    </h2>
                    <div className="py-4 text-[#30A78A] w-full text-[64px] leading-[75px] text-center bg-[#F3F5F7] rounded-xl">
                      {label}
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  <div className="mt-4 mb-8">
                    <SimilarProfileBadge peopleCount={253} />
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

export { IntjCard };
