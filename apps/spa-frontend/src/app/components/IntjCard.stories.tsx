import { Meta, StoryObj } from '@storybook/react';
import { IntjCard } from './IntjCard';
import { withRouter } from 'storybook-addon-remix-react-router';
import { BreadcrumbProvider } from '../providers/BreadcrumbContext';
import { intjCard } from './mock-data';

export default {
  title: 'Components/IntjCard',
  component: IntjCard,
  decorators: [withRouter],
} as Meta<typeof IntjCard>;

export const Default: StoryObj<typeof IntjCard> = {
  args: {
    header: intjCard.header,
    label: intjCard.label,
    description: intjCard.description,
    data: {
      title: intjCard.data.title,
      content: intjCard.data.content,
    },
  },
  decorators: [
    (Story) => (
      <BreadcrumbProvider>
        <div style={{ maxWidth: '538px' }}>
          <Story />
        </div>
      </BreadcrumbProvider>
    ),
  ],
};
