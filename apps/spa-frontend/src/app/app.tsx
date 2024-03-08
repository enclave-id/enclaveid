import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Landing } from './pages/landing';
import { Toaster } from 'react-hot-toast';
import { Authentication } from './pages/authentication';
import { BreadcrumbProvider } from './context/BreadcrumbContext';

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
]);

export function App() {
  return (
    <BreadcrumbProvider>
      <RouterProvider router={router} />;
      <Toaster position="bottom-right" reverseOrder={false} />
    </BreadcrumbProvider>
  );
}
