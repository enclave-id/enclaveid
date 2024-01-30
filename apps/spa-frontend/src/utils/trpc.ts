/* eslint-disable @nx/enforce-module-boundaries */
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'apps/api/src/app/router';

export const trpc = createTRPCReact<AppRouter>();
