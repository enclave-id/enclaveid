import { Meta, StoryObj } from '@storybook/react';
import { DashboardPage } from './DashboardPage';
import { withRouter } from 'storybook-addon-react-router-v6';
import { BreadcrumbProvider } from '../context/BreadcrumbContext';
import { Navigate } from 'react-router-dom';
import { PersonalityContent } from '../components/PersonalityContent';
import { TraitCardDetails } from '../components/TraitCardDetails';

export default {
  title: 'Components/DashboardPage',
  component: DashboardPage,
  decorators: [withRouter],
} as Meta<typeof DashboardPage>;

export const Default: StoryObj<typeof DashboardPage> = {
  decorators: [
    (Story) => (
      <div className="flex bg-white" style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    reactRouter: {
      routing: [
        { path: '/', element: <Navigate to="/dashboard" replace /> },
        {
          path: 'dashboard',
          element: (
            <BreadcrumbProvider>
              <DashboardPage />
            </BreadcrumbProvider>
          ),
          children: [
            { index: true, element: <Navigate to="personality" replace /> },
            { path: 'personality', element: <PersonalityContent /> },
            { path: 'personality/:title', element: <TraitCardDetails /> },
            { path: 'politics', element: <div>Politics Content</div> },
            { path: 'career', element: <div>Career Content</div> },
          ],
        },
      ],
    },
  },
};
