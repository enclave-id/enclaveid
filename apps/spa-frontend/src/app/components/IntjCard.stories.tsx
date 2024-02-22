import { Meta, StoryObj } from '@storybook/react';
import { IntjCard } from './IntjCard';

export default {
  title: 'Components/IntjCard',
  component: IntjCard,
} as Meta<typeof IntjCard>;

export const Default: StoryObj<typeof IntjCard> = {
  args: {
    header: 'MBTI',
    title: 'INTJ',
    description:
      'Introverted, Intuitive, Thinking, and Judging. It indicates a person who is energized by spending time alone, prioritizes ideas and concepts over facts and details, makes decisions based on logic and reason, and prefers to be organized and planned.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '538px' }}>
        <Story />
      </div>
    ),
  ],
};
