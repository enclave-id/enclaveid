import { ReactNode } from 'react';
import classNames from 'classnames';

interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
  noGap?: boolean;
}

function SidebarSection({
  title,
  children,
  noGap = false,
}: SidebarSectionProps) {
  return (
    <section
      className={classNames('flex flex-col', noGap ? 'gap-[1px]' : 'gap-2.5')}
    >
      {title && (
        <span className="text-xs leading-[14px] font-semibold tracking-[0.1em] text-[#B5BBC6] uppercase">
          {title}
        </span>
      )}
      {children}
    </section>
  );
}

export { SidebarSection };
