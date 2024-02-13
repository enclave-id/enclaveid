import { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
} as Meta;

export const DefaultSidebar: StoryObj<typeof Sidebar> = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex bg-white">
        <Story />
      </div>
    ),
  ],
};
