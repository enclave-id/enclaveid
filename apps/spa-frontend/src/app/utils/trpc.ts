import type { AppRouter } from 'apps/api/src/app/router';

import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { symmetricEncrypt, symmetricDecrypt } from './crypto/symmetricBrowser';
import { TRPC_PREFIX, TRPC_PRIVATE_NAMESPACE } from '@enclaveid/shared';

export const trpc = createTRPCReact<AppRouter>();

const customFetch = async (input: RequestInfo, init: RequestInit) => {
  if (
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

  if (input.toString().includes(`${TRPC_PREFIX}/${TRPC_PRIVATE_NAMESPACE}.`)) {
    const { encryptedPayload, nonce } = await response.json();

    const decryptedPayload = await symmetricDecrypt(encryptedPayload, nonce);

    return new Response(JSON.parse(decryptedPayload), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } else {
    return response;
  }
};

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL + TRPC_PREFIX,
      fetch: customFetch,
      // You can pass any HTTP headers you wish here
      // async headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    }),
  ],
});
