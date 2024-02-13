import { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
} as Meta;

export const DefaultSidebar: StoryObj<typeof Sidebar> = {
  decorators: [
    (Story) => (
      <div className="flex bg-white" style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};
