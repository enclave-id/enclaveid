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
    variant: {
      control: { type: 'select', options: ['primary', 'secondary'] },
      defaultValue: 'primary',
    },
  },
} as Meta<typeof GradientLine>;

export const Primary: StoryObj<typeof GradientLine> = {
  args: {
    value: 50,
    title: 'Openness to Experiences',
    variant: 'primary',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '490px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Secondary: StoryObj<typeof GradientLine> = {
  args: {
    value: 75,
    title: 'Warmth',
    variant: 'secondary',
    index: 0,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '538px', paddingTop: '40px' }}>
        <Story />
      </div>
    ),
  ],
};
