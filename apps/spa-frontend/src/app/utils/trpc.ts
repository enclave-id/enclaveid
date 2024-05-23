import type { AppRouter } from 'apps/api/src/app/router';

import { createTRPCReact } from '@trpc/react-query';
import {
  createWSClient,
  httpBatchLink,
  wsLink,
  splitLink,
  loggerLink,
} from '@trpc/client';
import { symmetricEncrypt, symmetricDecrypt } from './crypto/symmetricBrowser';
import { TRPC_PREFIX, TRPC_PRIVATE_NAMESPACE } from '@enclaveid/shared';

export const trpc = createTRPCReact<AppRouter>();

const customFetch = async (input: RequestInfo, init: RequestInit) => {
  if (
    import.meta.env.VITE_ENABLE_CONFIDENTIALITY === 'true' &&
    input.toString().includes(`${TRPC_PREFIX}/${TRPC_PRIVATE_NAMESPACE}.`) &&
    init.method === 'POST'
  ) {
    const { encryptedPayload, nonce } = await symmetricEncrypt(
      init.body as string,
    );

    init.body = JSON.stringify({
      encryptedPayload,
      nonce,
    });
  }

  // Pass the httponly cookies
  init.credentials = 'include';

  const response = await fetch(input, init);

  if (
    import.meta.env.VITE_ENABLE_CONFIDENTIALITY === 'true' &&
    input.toString().includes(`${TRPC_PREFIX}/${TRPC_PRIVATE_NAMESPACE}.`)
  ) {
    const { encryptedPayload, nonce } = await response.json();

    const decryptedPayload = await symmetricDecrypt(encryptedPayload, nonce);

    return new Response(JSON.parse(decryptedPayload), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  return response;
};

const wsClient = createWSClient({
  url:
    (import.meta.env.DEV ? 'ws://' : 'wss://') +
    import.meta.env.VITE_API_URL +
    TRPC_PREFIX,
});

export const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: (opts) =>
        (process.env.NODE_ENV === 'development' &&
          typeof window !== 'undefined') ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    splitLink({
      condition: (op) => op.type === 'subscription',
      true: wsLink({
        client: wsClient,

      }),
      false: httpBatchLink({
        url:
          (import.meta.env.DEV ? 'http://' : 'https://') +
          import.meta.env.VITE_API_URL +
          TRPC_PREFIX,
        fetch: customFetch,
      }),
    }),
  ],
});
