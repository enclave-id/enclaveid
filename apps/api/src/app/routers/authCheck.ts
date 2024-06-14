import { authenticatedProcedure, router } from '../trpc';

export const authCheck = router({
  authCheck: authenticatedProcedure.query(async (opts) => {
    // We always return true since the authentication
    // is handled upstream
    return { isAuthenticated: true };
  }),
});
