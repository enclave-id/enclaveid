import { Meta, StoryObj } from '@storybook/react';
import { TraitCard2 } from './TraitCard2';
import { traitCard2 } from './mock-data';
import { withRouter } from 'storybook-addon-react-router-v6';
import { BreadcrumbProvider } from '../context/BreadcrumbContext';

export default {
  title: 'Components/TraitCard2',
  component: TraitCard2,
  decorators: [withRouter],
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Personality Traits',
    },
  },
} as Meta<typeof TraitCard2>;

export const Default: StoryObj<typeof TraitCard2> = {
  args: {
    title: '16FP',
    data: traitCard2,
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
