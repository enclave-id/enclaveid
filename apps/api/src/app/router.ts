import { initTRPC } from '@trpc/server';
import { authentication } from './routers/authentication';
import { attestation } from './routers/attestation';

const t = initTRPC.create();

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = t.mergeRouters(authentication, attestation);

export type AppRouter = typeof appRouter;
