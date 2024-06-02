import { Meta, StoryObj } from '@storybook/react';
import { TraitCard1 } from './TraitCard1';
import { traitCard1 } from './mock-data';
import { withRouter } from 'storybook-addon-remix-react-router';
import { BreadcrumbProvider } from '../context/BreadcrumbContext';

export default {
  title: 'Components/TraitCard1',
  component: TraitCard1,
  decorators: [withRouter],
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Personality Traits',
    },
  },
} as Meta<typeof TraitCard1>;

export const Default: StoryObj<typeof TraitCard1> = {
  args: {
    title: traitCard1.title,
    data: traitCard1.data,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '538px' }}>
        <BreadcrumbProvider>
          <Story />
        </BreadcrumbProvider>
      </div>
    ),
  ],
};
