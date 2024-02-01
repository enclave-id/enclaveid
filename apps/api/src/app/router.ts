import { authentication } from './routers/authentication';
import { attestation } from './routers/attestation';
import { mergeRouters } from './trpc';
import { confidential } from './routers/confidential';
import { fileUpload } from './routers/fileUpload';

export const appRouter = mergeRouters(
  attestation,
  authentication,
  confidential,
  fileUpload
);

export type AppRouter = typeof appRouter;
