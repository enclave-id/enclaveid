import { Meta, StoryObj } from '@storybook/react';
import { RadarChart } from './RadarChart';

export default {
  title: 'Components/RadarChart',
  component: RadarChart,
} as Meta<typeof RadarChart>;

export const Default: StoryObj<typeof RadarChart> = {
  args: {
    values: {
      investigate: 1,
      artistic: 2,
      conventional: 3,
      enterprising: 2,
      social: 5,
      realistic: 2,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '10px 0 0 20px' }}>
        <Story />
      </div>
    ),
  ],
};
