import { authentication } from './routers/authentication';
import { attestation } from './routers/attestation';
import { mergeRouters, router } from './trpc';
import { confidential } from './routers/personality';
import { fileUpload } from './routers/fileUpload';
import { pingPong } from './routers/pingPong';
import {
  TRPC_PRIVATE_NAMESPACE,
  TRPC_PUBLIC_NAMESPACE,
} from '@enclaveid/shared';

export const appRouter = router({
  [TRPC_PRIVATE_NAMESPACE]: mergeRouters(confidential, fileUpload, pingPong),
  [TRPC_PUBLIC_NAMESPACE]: mergeRouters(attestation, authentication),
});

export type AppRouter = typeof appRouter;
