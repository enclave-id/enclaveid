import { GradientLine } from './GradientLine';
import { Button } from './Button';
import { DashboardCardLayout } from './DashboardCardLayout';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { TraitCard } from './TraitCard';
import { SimilarProfileBadge } from './SimilarProfileBadge';
import { useBreadcrumb } from '../providers/BreadcrumbContext';
import { CustomDrawer } from './CustomDrawer';

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
  const navigate = useNavigate();
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
      <CustomDrawer
        title={`${title.toUpperCase()} Traits`}
        isOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      >
        <div className="gap-9 flex flex-col overflow-y-auto">
          {data.map((result, index) => (
            <TraitCard {...result} key={index} isDrawer={true} />
          ))}
          <div className="-mt-3 mb-8 px-4">
            <SimilarProfileBadge peopleCount={253} />
          </div>
        </div>
      </CustomDrawer>
    </>
  );
}

export { TraitCard1 };
