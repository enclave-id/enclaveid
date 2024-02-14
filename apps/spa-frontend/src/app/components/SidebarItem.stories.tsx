import { Meta, StoryObj } from '@storybook/react';
import { SidebarItem } from './SidebarItem';
import { HomeIcon } from '@heroicons/react/24/outline';

export default {
  title: 'Components/SidebarItem',
  component: SidebarItem,
  argTypes: {
    text: { control: 'text' },
    active: { control: 'boolean' },
  },
} as Meta;

export const Default: StoryObj<typeof SidebarItem> = {
  args: {
    icon: <HomeIcon />,
    text: 'Traits Dashboard',
    active: true,
  },
};
