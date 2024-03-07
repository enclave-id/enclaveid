import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Landing } from './pages/landing';
import { E2eTest } from './pages/e2eTest';
import { Toaster } from 'react-hot-toast';

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
  return (
    <div>
      <RouterProvider router={router} />;
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
