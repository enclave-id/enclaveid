import { Navigate, createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Landing } from './pages/landing';
import { Toaster } from 'react-hot-toast';
import { Authentication } from './pages/authentication';
import { BreadcrumbProvider } from './context/BreadcrumbContext';
import { DashboardPage } from './components/DashboardPage';
import { PersonalityContent } from './components/PersonalityContent';
import { TraitCardDetails } from './components/TraitCardDetails';
import { IntjCardDetails } from './components/IntjCardDetails';
import { TraitCard2Details } from './components/TraitCard2Details';
import { PoliticsContent } from './components/PoliticsContent';
import { CompassDetails } from './components/CompassDetails';
import { MFTDetails } from './components/MFTDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Authentication authenticationType="login" />,
  },
  {
    path: '/signup',
    element: <Authentication authenticationType="signup" />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/personality" replace />,
      },
      { path: 'personality', element: <PersonalityContent /> },
      { path: 'personality/trait/:title', element: <TraitCardDetails /> },
      { path: 'personality/mbti/:title', element: <IntjCardDetails /> },
      { path: 'personality/trait2/:title', element: <TraitCard2Details /> },
      { path: 'politics', element: <PoliticsContent /> },
      { path: 'politics/compass', element: <CompassDetails /> },
      { path: 'politics/mft', element: <MFTDetails /> },
      { path: 'career', element: <div>career content</div> },
      { path: 'non-latent', element: <div>non latent</div> },
    ],
  },
]);

export function App() {
  return (
    <BreadcrumbProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </BreadcrumbProvider>
  );
}
