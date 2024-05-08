import {
  TRPC_PRIVATE_NAMESPACE,
  TRPC_PUBLIC_NAMESPACE,
} from '@enclaveid/shared';

import { authentication } from './routers/authentication';
import { attestation } from './routers/attestation';
import { mergeRouters, router } from './trpc';
import { career } from './routers/dashboard/career';
import { politics } from './routers/dashboard/politics';
import { personality } from './routers/dashboard/personality';

export const appRouter = router({
  [TRPC_PRIVATE_NAMESPACE]: mergeRouters(
    personality,
    career,
    politics,
    //fakeOauth,
  ),
  [TRPC_PUBLIC_NAMESPACE]: mergeRouters(attestation, authentication),
});

export type AppRouter = typeof appRouter;
