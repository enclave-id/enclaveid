import classNames from 'classnames';
import { ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
  isDrawer?: boolean;
}

interface WithTitleProps extends BaseProps {
  withTitle: true;
  title: string;
}

interface WithoutTitleProps extends BaseProps {
  withTitle?: false;
  title?: never;
}

type DashboardCardLayoutProps = WithTitleProps | WithoutTitleProps;

function DashboardCardLayout({
  children,
  withTitle,
  title,
  isDrawer,
}: DashboardCardLayoutProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {withTitle && (
        <h2 className="text-lg leading-[21px] text-passiveLinkColor text-center uppercase">
          {title}
        </h2>
      )}
      <article
        className={classNames(
          isDrawer ? '' : 'border border-[#E5E8EE] rounded-3xl bg-white h-full',
        )}
      >
        {children}
      </article>
    </div>
  );
}

export { DashboardCardLayout };
