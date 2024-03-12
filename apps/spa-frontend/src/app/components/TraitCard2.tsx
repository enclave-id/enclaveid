import { GradientLine } from './GradientLine';
import { Button } from './Button';
import { DashboardCardLayout } from './DashboardCardLayout';
import { useNavigate } from 'react-router-dom';
import { useBreadcrumb } from '../context/BreadcrumbContext';
import { useState } from 'react';
import { Drawer } from 'vaul';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SimilarProfileBadge } from './SimilarProfileBadge';

interface DataProps {
  label: string;
  value: number;
  description: string;
}
export interface TraitCard2Props {
  title: string;
  data: DataProps[];
}

function TraitCard2({ title, data }: TraitCard2Props) {
  let navigate = useNavigate();
  const { setLink } = useBreadcrumb();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClick = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 640) {
      setLink(title);
      navigate(`/dashboard/personality/trait2/${title.toLocaleLowerCase()}`, {
        state: { title, data },
      });
    } else {
      setIsDrawerOpen(true);
    }
  };

  return (
    <>
      <DashboardCardLayout withTitle title={title}>
        <div className="flex flex-col px-3 pb-[15px] pt-[52px]">
          <div className="pl-[15px] pr-3 flex flex-col gap-5">
            {data.map((result, index) => (
              <GradientLine
                title={result.label}
                value={result.value}
                key={index}
                index={index}
                variant="secondary"
              />
            ))}
          </div>
          <div className="mt-[86px]">
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
              <div className="flex flex-col gap-5 w-full">
                <div className="flex items-center justify-between py-4 px-5">
                  <span className="opacity-0"></span>
                  <Drawer.Title className="text-passiveLinkColor text-lg leading-[21px] font-semibold">
                    {title.toUpperCase()}
                  </Drawer.Title>
                  <button onClick={() => setIsDrawerOpen(false)}>
                    <ChevronDownIcon className="text-passiveLinkColor w-5 h-5" />
                  </button>
                </div>
                <div className="gap-9 flex flex-col overflow-y-auto px-4">
                  <div className="flex flex-col gap-5">
                    <h2 className="text-passiveLinkColor text-lg leadig-[22px] font-medium">
                      Your Results
                    </h2>
                    <div className="flex flex-col gap-[34px]">
                      {data.map((item, index) => {
                        return (
                          <div key={index} className="flex flex-col">
                            <div className="text-passiveLinkColor font-medium leading-[19px] py-[7px] text-center px-0 md:px-[154px] md:max-w-max w-full max-w-full bg-[#F3F5F7] rounded-xl mb-12 whitespace-nowrap">
                              {item.label}
                            </div>
                            <GradientLine
                              title={item.label}
                              value={item.value}
                              key={index}
                              index={index}
                              variant="secondary"
                              isDrawer={true}
                            />
                            <p className="text-passiveLinkColor leading-[22px] mt-3.5">
                              {item.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="-mt-3 mb-8">
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

export { TraitCard2 };
