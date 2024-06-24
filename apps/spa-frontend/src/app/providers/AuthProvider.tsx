import { createContext, useContext, useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import { LoadingPage } from '../pages/LoadingPage';
import { Navigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const authCheck = trpc.private.authCheck.useQuery(null, {
    retry: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (authCheck.isFetched) {
      setIsAuthenticated(!!authCheck?.data?.isAuthenticated);
    }
  }, [authCheck?.data, authCheck.isFetched]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated == null ? (
    <LoadingPage />
  ) : !isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
