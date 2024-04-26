import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface TabProps {
  path: string;
  title: string;
}

function Tab({ path, title }: TabProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classNames(
          'text-sm leading-4 pl-[18px] pr-[19px] py-3 transition-colors relative focus:outline-none shrink-0 whitespace-nowrap',
          isActive
            ? 'font-medium text-greenBg tabButtonSelected'
            : 'font-normal text-passiveLinkColor',
        )
      }
    >
      {title}
    </NavLink>
  );
}

export { Tab };
