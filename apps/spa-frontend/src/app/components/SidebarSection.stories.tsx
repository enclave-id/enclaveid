import { Meta, StoryObj } from '@storybook/react';
import { SidebarSection } from './SidebarSection';
import { SidebarItem } from './SidebarItem';
import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { withRouter } from 'storybook-addon-remix-react-router';

export default {
  title: 'Components/SidebarSection',
  component: SidebarSection,
  decorators: [withRouter],
} as Meta<typeof SidebarSection>;

export const WithSidebarItems: StoryObj<typeof SidebarSection> = {
  render: () => (
    <SidebarSection title={'Data'}>
      <SidebarItem icon={<HomeIcon />} text="Trait Dashboard" />
      <SidebarItem icon={<ChartBarIcon />} text="Charts" />
    </SidebarSection>
  ),
};
