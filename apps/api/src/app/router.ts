import { authentication } from './routers/authentication';
import { attestation } from './routers/attestation';
import { mergeRouters } from './trpc';

export const appRouter = mergeRouters(authentication, attestation);

export type AppRouter = typeof appRouter;
