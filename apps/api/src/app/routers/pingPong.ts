import { authenticatedProcedure, router } from '../trpc';
import {
  decryptRequestPayload,
  encryptResponsePayload,
} from '../services/symmetricCrypto';
import { z } from 'zod';
import { AppContext } from '../context';

export const pingPong = router({
  pingPong: authenticatedProcedure
    .input(
      z.object({
        encryptedPayload: z.string(),
        nonce: z.string(),
      })
    )
    .mutation(async (opts) => {
      const {
        user: { id: userId },
      } = opts.ctx as AppContext;

      const { encryptedPayload, nonce } = opts.input;

      const ping = await decryptRequestPayload(userId, encryptedPayload, nonce);

      const { encryptedPayload: newEncryptedPayload, nonce: newNonce } =
        await encryptResponsePayload(userId, {
          pong: `${ping}pong`,
        });

      return { encryptedPayload: newEncryptedPayload, nonce: newNonce };
    }),
});
