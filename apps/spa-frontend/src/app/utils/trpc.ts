import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'apps/api/src/app/router';

export const trpc = createTRPCReact<AppRouter>();
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      // You can pass any HTTP headers you wish here
      // async headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    }),
  ],
});
