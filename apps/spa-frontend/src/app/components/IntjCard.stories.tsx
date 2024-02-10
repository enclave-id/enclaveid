import { Meta, StoryObj } from '@storybook/react';
import { IntjCard } from './IntjCard';

export default {
  title: 'Components/IntjCard',
  component: IntjCard,
} as Meta<typeof IntjCard>;

export const Default: StoryObj<typeof IntjCard> = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '538px' }}>
        <Story />
      </div>
    ),
  ],
};
