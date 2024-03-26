import { Breadcrumb } from './Breadcrumb';
import { Sidebar } from './Sidebar';
import { SocialCard } from './SocialCard';

function SocialPage() {
  return (
    <div className="h-screen bg-white flex sm:flex-row flex-col">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="pt-[54px] pb-4 sm:block hidden px-6">
          <Breadcrumb />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-6 gap-x-5 gap-y-4">
          <SocialCard />
        </div>
      </div>
    </div>
  );
}

export { SocialPage };
