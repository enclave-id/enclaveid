import { Breadcrumb } from './Breadcrumb';

import { Sidebar } from './Sidebar';
import { Tabs } from './Tabs';

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
