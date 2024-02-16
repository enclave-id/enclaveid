import { Button } from './Button';

interface IntjCardProps {
  header: string;
  title: string;
  description: string;
}

function IntjCard({ header, title, description }: IntjCardProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <span className="text-[#6C7A8A] text-lg leading-[21px] text-center">
        {header}
      </span>
      <article className="border border-[#E5E8EE] rounded-3xl bg-white">
        <div className="flex flex-col gap-[5px] px-3 pt-[9px] pb-[15px] ">
          <h1 className="text-[64px] leading-[75px] text-[#30A78A] text-center">
            {title}
          </h1>
          <p className="text-[#6C7A8A] leading-[22px] px-3 ">{description}</p>
          <div>
            <Button label="Dive Deeper" variant="tertiary" fullWidth />
          </div>
        </div>
      </article>
    </div>
  );
}

export { IntjCard };
