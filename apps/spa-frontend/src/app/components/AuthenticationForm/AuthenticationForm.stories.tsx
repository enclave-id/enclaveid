import { Meta, StoryObj } from '@storybook/react';
import {
  AuthenticationForm,
  AuthenticationFormProps,
} from './AuthenticationForm';

export default {
  title: 'Components/AuthenticationForm',
  component: AuthenticationForm,
  argTypes: {
    email: {
      control: 'text',
      defaultValue: '',
    },
    password: {
      control: 'text',
      defaultValue: '',
    },
  },
} as Meta;

export const SignUp: StoryObj<AuthenticationFormProps> = {
  args: {
    handleSubmit: (email, password) => {
      console.log(`Email: ${email}, Password: ${password}`);
    },
  },
  render: (args) => <AuthenticationForm {...args} />,
};
