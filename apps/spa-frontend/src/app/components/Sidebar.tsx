import { SidebarSection } from './SidebarSection';
import { SidebarItem } from './SidebarItem';
import { HomeIcon } from '@heroicons/react/24/outline';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { UsersIcon } from '@heroicons/react/24/outline';

import { BellIcon } from '@heroicons/react/24/outline';
import { CogIcon } from '@heroicons/react/24/outline';
import { SimilarProfileBadge } from './SimilarProfileBadge';

function Sidebar() {
  return (
    <aside className="w-[296px] bg-[#F3F5F7] px-[22px] flex flex-col">
      <div className="pb-[54px] pt-12 border-b border-b-[#E5E8EE]">
        <h1 className="text-passiveLinkColor text-4xl leading-[42px] tracking-[-0.02em] text-center">
          EnclaveID
        </h1>
      </div>
      <div className="flex flex-col justify-between flex-1 py-5">
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
    </aside>
  );
}

export { Sidebar };
