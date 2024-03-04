import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Landing } from './pages/landing';
import { AttestationTest } from './pages/attestationTest';
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
  {
    path: '/attestation',
    element: <AttestationTest />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
