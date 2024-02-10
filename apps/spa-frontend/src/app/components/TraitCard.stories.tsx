import { Meta, StoryObj } from '@storybook/react';
import { TraitCard } from './TraitCard';

export default {
  title: 'Components/TraitCard',
  component: TraitCard,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Openness to Experiences',
    },
    value: {
      control: 'range',
      defaultValue: 85,
      min: 0,
      max: 100,
      step: 1,
    },
  },
} as Meta<typeof TraitCard>;

export const Default: StoryObj<typeof TraitCard> = {
  args: {
    title: 'Openness to Experiences',
    value: 85,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '538px' }}>
        <Story />
      </div>
    ),
  ],
};
