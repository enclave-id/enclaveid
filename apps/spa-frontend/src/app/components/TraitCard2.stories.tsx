import { Meta, StoryObj } from '@storybook/react';
import { TraitCard2 } from './TraitCard2';

export default {
  title: 'Components/TraitCard2',
  component: TraitCard2,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Personality Traits',
    },
  },
} as Meta<typeof TraitCard2>;

const data = [
  {
    label: 'Warmth',
    value: 40,
  },
  {
    label: 'Reasoning',
    value: 60,
  },
  {
    label: 'Emotional Stability',
    value: 30,
  },
  {
    label: 'Dominance',
    value: 80,
  },
  {
    label: 'Liveliness',
    value: 25,
  },
  {
    label: 'Rule-Consciousness',
    value: 55,
  },
  {
    label: 'Social Boldness',
    value: 20,
  },
  {
    label: 'Sensitivity',
    value: 80,
  },
  {
    label: 'Vigilance',
    value: 50,
  },
  {
    label: 'Abstractedness',
    value: 70,
  },
  {
    label: 'Privateness',
    value: 95,
  },
  {
    label: 'Apprehension',
    value: 30,
  },
  {
    label: 'Openness to Change',
    value: 45,
  },
  {
    label: 'Self-Reliance',
    value: 35,
  },
  {
    label: 'Perfectionism',
    value: 65,
  },
  {
    label: 'Tension',
    value: 30,
  },
];

export const Default: StoryObj<typeof TraitCard2> = {
  args: {
    title: '16FP',
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
