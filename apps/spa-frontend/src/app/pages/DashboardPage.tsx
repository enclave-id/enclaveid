import { Breadcrumb } from '../components/Breadcrumb';

import { Sidebar } from '../components/Sidebar';
import { Tabs } from '../components/Tabs';

function DashboardPage() {
  return (
    <div className="h-screen bg-white flex sm:flex-row flex-col">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="pt-[54px] pb-4 sm:block hidden px-6">
          <Breadcrumb />
        </div>
        <Tabs />
      </div>
    </div>
  );
}

export { DashboardPage };
