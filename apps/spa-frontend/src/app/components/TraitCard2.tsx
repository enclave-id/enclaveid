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

function TraitCard2({ title, data }: TraitCardProps) {
  return (
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
          <Button label="Dive Deeper" variant="tertiary" fullWidth />
        </div>
      </div>
    </DashboardCardLayout>
  );
}

export { TraitCard2 };
