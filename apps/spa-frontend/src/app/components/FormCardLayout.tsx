import { ReactNode } from 'react';

interface CardLayoutProps {
  children: ReactNode;
}

function FormCardLayout({ children }: CardLayoutProps) {
  return (
    <div className="bg-white border border-[#E5E8EE] rounded-xl px-4 sm:px-9 pt-[30px] pb-12">
      {children}
    </div>
  );
}

export { FormCardLayout };
