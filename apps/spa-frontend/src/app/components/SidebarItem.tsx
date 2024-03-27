import { ReactElement, cloneElement } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  icon: ReactElement;
  text: string;
  active?: boolean;
  href?: string;
}

function SidebarItem({
  icon,
  text,
  active = false,
  href,
}: SidebarItemProps): ReactElement {
  const activeLinkClass = 'font-semibold text-greenBg';
  const passiveLinkClass = 'font-medium text-passiveLinkColor';

  const iconWithClassName = cloneElement(icon, {
    className: classNames(
      'w-6 h-6',
      active ? 'text-activeIconColor' : 'text-passiveIconColor',
    ),
  });

  if (href) {
    return (
      <Link className="flex items-center gap-2.5 px-2.5 py-3 w-full" to={href}>
        {iconWithClassName}
        <span
          className={classNames(
            'leading-5',
            active ? activeLinkClass : passiveLinkClass,
          )}
        >
          {text}
        </span>
      </Link>
    );
  }

  return (
    <button className="flex items-center gap-2.5 px-2.5 py-3 w-full">
      {iconWithClassName}
      <span
        className={classNames(
          'leading-5',
          active ? activeLinkClass : passiveLinkClass,
        )}
      >
        {text}
      </span>
    </button>
  );
}

export { SidebarItem };
