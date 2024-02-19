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
  },
} as Meta<typeof CompassChart>;

export const Default: StoryObj<typeof CompassChart> = {
  args: {
    x: 0,
    y: 0,
  },
};
