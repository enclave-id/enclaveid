import { GradientLine } from './GradientLine';
import { Button } from './Button';

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
    <div className="flex flex-col gap-2.5">
      <h2 className="text-lg leading-[21px] text-passiveLinkColor text-center uppercase">
        {title}
      </h2>
      <article className="rounded-3xl border border-[#E5E8EE] bg-white pt-[26px] pb-3.5 px-3">
        <div className="px-3 flex flex-col gap-6">
          {data.map((result, index) => (
            <GradientLine
              title={result.label}
              value={result.value}
              key={index}
            />
          ))}
        </div>
        <div className="mt-[15px]">
          <Button label="Dive Deeper" variant="tertiary" fullWidth />
        </div>
      </article>
    </div>
  );
}

export { TraitCard1 };
