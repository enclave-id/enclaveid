import { Meta, StoryObj } from '@storybook/react';
import CompassChart from './CompassChart';

export default {
  title: 'Components/CompassChart',
  component: CompassChart,
  argTypes: {
    x: {
      control: 'number',
      defaultValue: 0,
      description: 'X axis coordinate',
    },
    y: {
      control: 'number',
      defaultValue: 0,
      description: 'Y axis coordinate',
    },
    description: {
      control: 'text',
      description: 'Optional description of the chart',
    },
    showDescription: {
      control: 'boolean',
      defaultValue: false,
      description: 'Toggles the visibility of the description',
    },
  },
} as Meta<typeof CompassChart>;

export const Default: StoryObj<typeof CompassChart> = {
  args: {
    x: 2,
    y: 4,
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '10px 0 0 20px' }}>
        <Story />
      </div>
    ),
  ],
};
