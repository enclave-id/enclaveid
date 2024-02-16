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

function TraitCard2({ title, data }: TraitCardProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-lg leading-[21px] text-passiveLinkColor text-center uppercase">
        {title}
      </h2>
      <article className="rounded-3xl border border-[#E5E8EE] bg-white px-3 pb-[15px] pt-[52px]">
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
      </article>
    </div>
  );
}

export { TraitCard2 };
