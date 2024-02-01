import type { Meta, StoryObj } from '@storybook/react';
import { AuthenticationForm } from './AuthenticationForm';

const meta: Meta<typeof AuthenticationForm> = {
  component: AuthenticationForm,
};

export default meta;
type Story = StoryObj<typeof AuthenticationForm>;

export const Primary: Story = {
  args: {
    handleSubmit: (email, passowrd) => {},
  },
};
