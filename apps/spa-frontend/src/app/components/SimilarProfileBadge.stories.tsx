import { Meta, StoryObj } from '@storybook/react';
import { SimilarProfileBadge } from './SimilarProfileBadge';

export default {
  title: 'Components/SimilarProfileBadge',
  component: SimilarProfileBadge,
} as Meta;

export const Default: StoryObj<typeof SimilarProfileBadge> = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '250px' }}>
        <Story />
      </div>
    ),
  ],
};
