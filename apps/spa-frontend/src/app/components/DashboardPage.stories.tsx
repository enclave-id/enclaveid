import { Meta, StoryObj } from '@storybook/react';
import { DashboardPage } from './DashboardPage';

export default {
  title: 'Components/DashboardPage',
  component: DashboardPage,
} as Meta;

export const Default: StoryObj<typeof DashboardPage> = {
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
