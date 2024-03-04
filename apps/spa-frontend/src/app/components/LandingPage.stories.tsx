import { Meta, StoryObj } from '@storybook/react';
import { LandingPage } from './LandingPage';

const meta: Meta<typeof LandingPage> = {
  title: 'Components/LandingPage',
  component: LandingPage,
};

export default meta;

type Story = StoryObj<typeof LandingPage>;

export const Default: Story = {
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
};
