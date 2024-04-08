import { Navigate, createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthenticationPage } from './pages/AuthenticationPage';
import { BreadcrumbProvider } from './context/BreadcrumbContext';
import { DashboardPage } from './pages/DashboardPage';
import { PersonalityContent } from './components/PersonalityContent';
import { TraitCardDetails } from './components/TraitCardDetails';
import { IntjCardDetails } from './components/IntjCardDetails';
import { SixteenPFCardDetails } from './components/SixteenPFCardDetails';
import { PoliticsContent } from './components/PoliticsContent';
import { CompassDetails } from './components/CompassDetails';
import { MFTDetails } from './components/MFTDetails';
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { SocialPage } from './components/SocialPage';
import { CareerContent } from './components/CareerContent';
import { RadarChartDetails } from './components/RadarChartDetails';
import { ChatPage } from './components/ChatUI/ChatPage';
import { PersonalityContainer } from './components/containers/PersonalityContainer';


const reactRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <AuthenticationPage authenticationType="login" />,
  },
  {
    path: '/signup',
    element: <AuthenticationPage authenticationType="signup" />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/personality" replace />,
      },
      {
        path: 'personality',
        element: (
          <PersonalityContainer>
            <PersonalityContent />
          </PersonalityContainer>
        ),
      },
      { path: 'personality/trait/:title', element: <TraitCardDetails /> },
      { path: 'personality/mbti/:title', element: <IntjCardDetails /> },
      { path: 'personality/trait2/:title', element: <SixteenPFCardDetails /> },
      { path: 'politics', element: <PoliticsContent /> },
      { path: 'politics/compass', element: <CompassDetails /> },
      { path: 'politics/mft', element: <MFTDetails /> },
      { path: 'career', element: <CareerContent /> },
      { path: 'career/radar', element: <RadarChartDetails /> },
      { path: 'non-latent', element: <div>non latent</div> },
    ],
  },
  {
    path: '/socials',
    element: <SocialPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
]);

export function App() {
  return (
    <BreadcrumbProvider>
      <RouterProvider router={reactRouter} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </BreadcrumbProvider>
  );
}
