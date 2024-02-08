import { Meta, StoryObj } from '@storybook/react';
import { GradientLine } from './GradientLine';

export default {
  title: 'Components/GradientLine',
  component: GradientLine,
  argTypes: {
    value: {
      control: 'range',
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 1,
    },
    title: {
      control: 'text',
      defaultValue: 'Openness to Experiences',
    },
  },
} as Meta<typeof GradientLine>;

export const Default: StoryObj<typeof GradientLine> = {
  args: {
    value: 50,
    title: 'Openness to Experiences',
  },
};
