import { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { withRouter } from 'storybook-addon-remix-react-router';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  decorators: [withRouter],
} as Meta;

export const Default: StoryObj = {
  args: {},
};
