import { SidebarSection } from './SidebarSection';
import { SidebarItem } from './SidebarItem';
import { HomeIcon } from '@heroicons/react/24/outline';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { UsersIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/outline';
import { CogIcon } from '@heroicons/react/24/outline';
import { SimilarProfileBadge } from './SimilarProfileBadge';

function Sidebar() {
  return (
    <aside className="w-full sm:w-[296px] bg-[#F3F5F7] px-[18px] sm:px-[22px] flex flex-col sm:h-full h-max border-b border-b-[#E5E8EE] sm:border-none">
      <div className="pb-3.5 sm:pb-[54px] pt-[55px] sm:pt-12 sm:border-b border-b-[#E5E8EE] flex items-center justify-between">
        <h1 className="text-passiveLinkColor text-xl leading-6 sm:text-4xl sm:leading-[42px] tracking-[-0.02em] text-center">
          EnclaveID
        </h1>
        <button className="sm:hidden">
          <Bars3Icon className="w-5 h-5 text-passiveLinkColor" />
        </button>
      </div>
      <div className="sm:flex hidden flex-col justify-between flex-1 py-5">
        <div className="flex flex-col gap-[18px]">
          <SidebarSection title={'Data'}>
            <SidebarItem
              icon={<HomeIcon />}
              text="Trait Dashboard"
              active={true}
            />
            <SidebarItem icon={<ChartBarIcon />} text="Charts" />
          </SidebarSection>
          <SidebarSection title={'Social'}>
            <SidebarItem icon={<UsersIcon />} text="Explore Social" />
            <SimilarProfileBadge peopleCount={1123} />
          </SidebarSection>
        </div>
        <SidebarSection noGap={true}>
          <SidebarItem icon={<BellIcon />} text="Notifications" />
          <SidebarItem icon={<CogIcon />} text="Account and Settings" />
        </SidebarSection>
      </div>
      <div className="sm:hidden block pb-[18px]">
        <SimilarProfileBadge peopleCount={1123} />
      </div>
    </aside>
  );
}

export { Sidebar };
