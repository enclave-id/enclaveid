import { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Sidebar } from './Sidebar';
import { SocialCard } from './SocialCard';
import { SocialFilter } from './SocialFilter';
import { userData } from './mock-data';
import { Outlet } from 'react-router-dom';
function SocialPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = userData.filter(
    (user) =>
      (selectedFilters.length === 0 || selectedFilters.includes(user.type)) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="h-screen bg-white flex sm:flex-row flex-col">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="pt-[54px] pb-4 sm:block hidden px-6">
          <Breadcrumb />
        </div>
        <div className="flex flex-col py-3.5 px-6 gap-3.5">
          <SocialFilter
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setSearchQuery={setSearchQuery}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-4">
            {filteredUsers.map((user, index) => (
              <SocialCard key={index} {...user} />
            ))}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export { SocialPage };
