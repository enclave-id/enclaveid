import { Meta, StoryObj } from '@storybook/react';
import { SidebarSection } from './SidebarSection';
import { SidebarItem } from './SidebarItem';
import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default {
  title: 'Components/SidebarSection',
  component: SidebarSection,
} as Meta<typeof SidebarSection>;

export const WithSidebarItems: StoryObj<typeof SidebarSection> = {
  render: () => (
    <SidebarSection title={'Data'}>
      <SidebarItem icon={<HomeIcon />} text="Trait Dashboard" active={true} />
      <SidebarItem icon={<ChartBarIcon />} text="Charts" />
    </SidebarSection>
  ),
};
