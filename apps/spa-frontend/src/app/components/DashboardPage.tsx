import { Breadcrumb } from './Breadcrumb';

import { Sidebar } from './Sidebar';
import { Tabs } from './Tabs';

function DashboardPage() {
  return (
    <div className="h-screen bg-white flex">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto px-6">
        <div className="pt-[54px] pb-4">
          <Breadcrumb />
        </div>
        <Tabs />
      </div>
    </div>
  );
}

export { DashboardPage };
