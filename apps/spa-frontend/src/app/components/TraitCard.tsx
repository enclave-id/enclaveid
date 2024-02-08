import { GradientLine } from './GradientLine';

interface TraitCardProps {
  title: string;
  value: number;
}

function TraitCard({ title, value }: TraitCardProps) {
  return (
    <article className="px-6 py-[26px] flex flex-col gap-[27px] border border-[#E5E8EE] rounded-3xl bg-white">
      <GradientLine title={title} value={value} />
      <p className="text-[#6C7A8A] leading-[22px]">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </article>
  );
}

export { TraitCard };
