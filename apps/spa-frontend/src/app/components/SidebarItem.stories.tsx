import { Meta, StoryObj } from '@storybook/react';
import { SidebarItem } from './SidebarItem';
import { HomeIcon } from '@heroicons/react/24/outline';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'Components/SidebarItem',
  component: SidebarItem,
  argTypes: {
    text: { control: 'text' },
  },
  decorators: [withRouter],
} as Meta;

export const Default: StoryObj<typeof SidebarItem> = {
  args: {
    icon: <HomeIcon />,
    text: 'Traits Dashboard',
  },
};
