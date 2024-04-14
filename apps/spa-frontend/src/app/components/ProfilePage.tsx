import { useLocation } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';
import { Sidebar } from './Sidebar';
import { Tabs } from './Tabs';
import { SocialCard } from './SocialCard';
import { useEffect } from 'react';
import { useBreadcrumb } from '../context/BreadcrumbContext';

function ProfilePage() {
  const location = useLocation();
  const { setLink } = useBreadcrumb();

  function formatUsernameFromPath(pathname: string): string {
    const usernameSlug = pathname.split('/').pop();

    if (!usernameSlug) return '';

    const formattedName = usernameSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return `${formattedName}'s Profile`;
  }

  useEffect(() => {
    setLink(formatUsernameFromPath(location.pathname));
  }, [location.pathname]);
  return (
    <div className="h-screen bg-white flex sm:flex-row flex-col">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="pt-[54px] pb-4 sm:block hidden px-6">
          <Breadcrumb />
        </div>
        <div>
          <div className="px-4 mt-5 pb-2">
            <SocialCard {...location.state} />
          </div>
          <Tabs />
        </div>
      </div>
    </div>
  );
}

export { ProfilePage };
