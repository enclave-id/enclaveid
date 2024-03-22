import classNames from "classnames";
import { DashboardCardLayout } from "./DashboardCardLayout";
import { GradientLine } from "./GradientLine";

interface TraitCardProps {
  label: string;
  value: number;
  description: string;
  isDrawer?: boolean;
}

function TraitCard({ label, value, description, isDrawer = false }: TraitCardProps) {
  return (
    <DashboardCardLayout isDrawer={isDrawer}>
      <div
        className={classNames(
          "flex flex-col gap-[27px]",
          isDrawer ? "px-3 pb-[22px] border-b" : "px-6 py-[26px]"
        )}
      >
        <GradientLine title={label} value={value} index={0} />
        <p className="text-[#6C7A8A] leading-[22px]">
          {description}
        </p>
      </div>
    </DashboardCardLayout>
  );
}

export { TraitCard };
