import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink, createTRPCProxyClient } from '@trpc/client';
import type { AppRouter } from 'apps/api/src/app/router';

export const trpc = createTRPCReact<AppRouter>();
export const trpcClient = createTRPCProxyClient<AppRouter>({
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
