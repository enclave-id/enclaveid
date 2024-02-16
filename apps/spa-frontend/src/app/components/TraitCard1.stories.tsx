import { Meta, StoryObj } from '@storybook/react';
import { TraitCard1 } from './TraitCard1';

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

const data = [
  {
    label: 'Openness to Experiences',
    value: 95,
  },
  {
    label: 'Conscientiousness',
    value: 30,
  },
  {
    label: 'Extraversion',
    value: 5,
  },
  {
    label: 'Agreeableness',
    value: 50,
  },
  {
    label: 'Neuroticism',
    value: 75,
  },
];
export const Default: StoryObj<typeof TraitCard1> = {
  args: {
    title: 'Ocean',
    data: data,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '538px' }}>
        <Story />
      </div>
    ),
  ],
};
