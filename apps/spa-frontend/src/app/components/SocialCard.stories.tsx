import { Meta, StoryObj } from '@storybook/react';
import { SocialCard } from './SocialCard';

export default {
  title: 'Components/SocialCard',
  component: SocialCard,
} as Meta;

export const Default: StoryObj<typeof SocialCard> = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '538px' }}>
        <Story />
      </div>
    ),
  ],
};
