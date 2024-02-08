import { ReactNode } from 'react';

interface CardLayoutProps {
  children: ReactNode;
}

function DashboardCardLayout({ children }: CardLayoutProps) {
  return (
    <article className="px-6 py-[26px] border border-[#E5E8EE] rounded-3xl bg-white">
      {children}
    </article>
  );
}

export { DashboardCardLayout };
