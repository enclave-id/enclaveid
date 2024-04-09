import classNames from 'classnames';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const tabs = [
  { title: 'Personality', path: '/dashboard/personality' },
  { title: 'Politics', path: '/dashboard/politics' },
  { title: 'Career', path: '/dashboard/career' },
  { title: 'Non-Latent', path: '/dashboard/non-latent' },
];

function Tabs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const showTabs = pathSegments.length <= 2;

  return (
    <div className="sm:px-6 px-0">
      {showTabs && (
        <div className="flex overflow-auto border-b border-[#E5E8EE] hideScrollbar pb-1">
          {tabs.map((tab, index) => (
            <NavLink
              to={tab.path}
              key={index}
              className={({ isActive }) =>
                classNames(
                  'text-sm leading-4 pl-[18px] pr-[19px] py-3 transition-colors relative focus:outline-none shrink-0 whitespace-nowrap',
                  isActive
                    ? 'font-medium text-greenBg tabButtonSelected'
                    : 'font-normal text-passiveLinkColor',
                )
              }
            >
              {tab.title}
            </NavLink>
          ))}
        </div>
      )}
      <div className={classNames(showTabs ? '' : 'lg:mt-[46px] mt-8')}>
        <Outlet />
      </div>
    </div>
  );
}

export { Tabs };
