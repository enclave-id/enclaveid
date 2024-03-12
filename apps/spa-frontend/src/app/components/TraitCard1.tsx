import { GradientLine } from './GradientLine';
import { Button } from './Button';
import { DashboardCardLayout } from './DashboardCardLayout';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { Drawer } from 'vaul';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { TraitCard } from './TraitCard';
import { SimilarProfileBadge } from './SimilarProfileBadge';
import { useBreadcrumb } from '../context/BreadcrumbContext';

interface DataProps {
  label: string;
  value: number;
  description: string;
}
export interface TraitCardProps {
  title: string;
  data: DataProps[];
}

function TraitCard1({ title, data }: TraitCardProps) {
  let navigate = useNavigate();
  const { setLink } = useBreadcrumb();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClick = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 640) {
      setLink(title);
      navigate(`/dashboard/personality/trait/${title.toLocaleLowerCase()}`, {
        state: { title, data },
      });
    } else {
      setIsDrawerOpen(true);
    }
  };
  return (
    <>
      <DashboardCardLayout withTitle title={title}>
        <div className="flex flex-col pt-[18px] sm:pt-[26px] pb-3.5 px-3">
          <div className="sm:px-3 flex flex-col gap-6">
            {data.map((result, index) => (
              <GradientLine
                title={result.label}
                value={result.value}
                key={index}
                index={index}
              />
            ))}
          </div>
          <div className="mt-[15px]">
            <Button
              onClick={handleClick}
              label="Dive Deeper"
              variant="tertiary"
              fullWidth
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
                    {title.toUpperCase()} Traits
                  </Drawer.Title>
                  <button onClick={() => setIsDrawerOpen(false)}>
                    <ChevronDownIcon className="text-passiveLinkColor w-5 h-5" />
                  </button>
                </div>
                <div className="gap-9 flex flex-col overflow-y-auto">
                  {data.map((result, index) => (
                    <TraitCard {...result} key={index} isDrawer={true} />
                  ))}
                  <div className="-mt-3 mb-8 px-4">
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

export { TraitCard1 };
