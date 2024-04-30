import { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  decorators: [withRouter],
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
