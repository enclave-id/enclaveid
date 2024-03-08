import { Navigate, createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Landing } from './pages/landing';
import { Toaster } from 'react-hot-toast';
import { Authentication } from './pages/authentication';
import { BreadcrumbProvider } from './context/BreadcrumbContext';
import { DashboardPage } from './components/DashboardPage';
import { PersonalityContent } from './components/PersonalityContent';
import { TraitCardDetails } from './components/TraitCardDetails';


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
    path: "/dashboard",
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/personality" replace />,
      },
      { path: "personality", element: <PersonalityContent /> },
      { path: "personality/:title", element: <TraitCardDetails /> },
      { path: "politics", element: <div>politics content</div> },
      { path: "career", element: <div>career content</div> },
      { path: "non-latent", element: <div>non latent</div> },
    ],
  },
]);

export function App() {
  return (
    <BreadcrumbProvider>
      <RouterProvider router={router} />;
      <Toaster position="bottom-right" reverseOrder={false} />
    </BreadcrumbProvider>
  );
}
