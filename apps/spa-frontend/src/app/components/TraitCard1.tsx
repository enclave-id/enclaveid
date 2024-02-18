import { GradientLine } from './GradientLine';
import { Button } from './Button';
import { DashboardCardLayout } from './DashboardCardLayout';

interface DataProps {
  label: string;
  value: number;
}
interface TraitCardProps {
  title: string;
  data: DataProps[];
}

function TraitCard1({ title, data }: TraitCardProps) {
  return (
    <DashboardCardLayout withTitle title={title}>
      <div className="flex flex-col pt-[26px] pb-3.5 px-3">
        <div className="px-3 flex flex-col gap-6">
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
          <Button label="Dive Deeper" variant="tertiary" fullWidth />
        </div>
      </div>
    </DashboardCardLayout>
  );
}

export { TraitCard1 };
