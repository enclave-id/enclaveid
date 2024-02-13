import { ReactElement, cloneElement } from 'react';
import classNames from 'classnames';

interface SidebarItemProps {
  icon: ReactElement;
  text: string;
  active?: boolean;
}

function SidebarItem({
  icon,
  text,
  active = false,
}: SidebarItemProps): ReactElement {
  const activeLinkClass = 'font-semibold text-greenBg';
  const passiveLinkClass = 'font-medium text-passiveLinkColor';

  const iconWithClassName = cloneElement(icon, {
    className: classNames(
      'w-6 h-6',
      active ? 'text-activeIconColor' : 'text-passiveIconColor'
    ),
  });

  return (
    <button className="flex items-center gap-2.5 px-2.5 py-3 w-full">
      {iconWithClassName}
      <span
        className={classNames(
          'leading-5',
          active ? activeLinkClass : passiveLinkClass
        )}
      >
        {text}
      </span>
    </button>
  );
}

export { SidebarItem };
