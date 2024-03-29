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

  const response = await fetch(input, init);

  if (input.toString().includes(`${TRPC_PREFIX}/${TRPC_PRIVATE_NAMESPACE}.`)) {
    const text = await response.text();
    const payload = JSON.parse(text);
    const decryptedPayload = await symmetricDecrypt(
      payload.encryptedPayload,
      payload.nonce,
    );

    return new Response(decryptedPayload, {
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
      url: 'http://localhost:3000/trpc',
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
