import { Meta, StoryObj } from '@storybook/react';
import { TraitCard } from './TraitCard';
import { traitCard1 } from './mock-data';

export default {
  title: 'Components/TraitCard',
  component: TraitCard,
  argTypes: {
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
    label: traitCard1.data[0].label,
    value: traitCard1.data[0].value,
    description: traitCard1.data[0].description
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '538px' }}>
        <Story />
      </div>
    ),
  ],
};
