import { Meta, StoryObj } from '@storybook/react';
import { StepForm } from './StepForm';
import { withRouter } from 'storybook-addon-remix-react-router';
import { questionnaires } from './containers/QuestionnaireContainer';

export default {
  title: 'Components/StepForm',
  component: StepForm,
  decorators: [withRouter],
  render: (args) => <StepForm {...args} />,
} as Meta;

export const Default: StoryObj = {
  args: {
    questions: questionnaires[1].questions,
    options: questionnaires[1].options,
  },
};
