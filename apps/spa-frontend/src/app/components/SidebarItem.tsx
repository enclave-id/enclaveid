import { ReactElement, cloneElement } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: ReactElement;
  text: string;
  href?: string;
  onClick?: () => void;
}

function SidebarItem({
  icon,
  text,
  href,
  onClick,
}: SidebarItemProps): ReactElement {
  const location = useLocation();

  const activeLinkClass = 'font-semibold text-greenBg';
  const passiveLinkClass = 'font-medium text-passiveLinkColor';

  const active = location.pathname.startsWith(href);

  const iconWithClassName = cloneElement(icon, {
    className: classNames(
      'w-6 h-6',
      active ? 'text-activeIconColor' : 'text-passiveIconColor',
    ),
  });

  const Component = href ? Link : 'button';

  return (
    <Component
      className="flex items-center gap-2.5 px-2.5 py-3 w-full"
      to={href}
      onClick={onClick}
    >
      {iconWithClassName}
      <span
        className={classNames(
          'leading-5',
          active ? activeLinkClass : passiveLinkClass,
        )}
      >
        {text}
      </span>
    </Component>
  );
}

export { SidebarItem };
