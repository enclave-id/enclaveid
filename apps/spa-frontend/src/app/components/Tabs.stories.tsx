import { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  decorators: [withRouter],
} as Meta;

export const Default: StoryObj = {
  args: {},
};
