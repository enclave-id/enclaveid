import { Meta, StoryObj } from '@storybook/react';
import { TraitCard1 } from './TraitCard1';
import { traitCard1 } from './mock-data';

export default {
  title: 'Components/TraitCard1',
  component: TraitCard1,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Personality Traits',
    },
  },
} as Meta<typeof TraitCard1>;

export const Default: StoryObj<typeof TraitCard1> = {
  args: {
    title: 'Ocean',
    data: traitCard1,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '538px' }}>
        <Story />
      </div>
    ),
  ],
};
