import { Outlet } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';
import { Sidebar } from './Sidebar';
import { SidebarContainer } from './containers/SidebarContainer';

function SocialLayout() {
  return (
    <div className="h-screen bg-white flex sm:flex-row flex-col">
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="pt-[54px] pb-4 sm:block hidden px-6">
          <Breadcrumb />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export { SocialLayout };
