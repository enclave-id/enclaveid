import { Meta, StoryObj } from '@storybook/react';
import { SocialCard } from './SocialCard';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'Components/SocialCard',
  component: SocialCard,
  decorators: [withRouter],
} as Meta;

export const Default: StoryObj<typeof SocialCard> = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '538px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    name: 'John Doe',
    gender: 'Male',
    location: 'New York',
    type: 'User',
    image: '',
    loading: false,
  },
};
