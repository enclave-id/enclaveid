import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Landing } from './pages/landing';
import { E2eTest } from './pages/e2eTest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/e2eTest',
    element: <E2eTest />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
