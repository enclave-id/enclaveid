import { authentication } from './routers/authentication';
import { attestation } from './routers/attestation';
import { mergeRouters } from './trpc';
import { confidential } from './routers/confidential';

export const appRouter = mergeRouters(
  attestation,
  authentication,
  confidential
);

export type AppRouter = typeof appRouter;
