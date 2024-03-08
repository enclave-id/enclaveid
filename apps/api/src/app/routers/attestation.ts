import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { getBase64Cbor } from '../services/attestation';
import { getPublicEncryptionKey } from '../services/crypto/asymmetricNode';

export const attestation = router({
  getAttestation: publicProcedure
    .input(
      z.object({
        nonce: z.string(),
      }),
    )
    .query(async (opts) => {
      const publicKey = await getPublicEncryptionKey();

      return {
        publicKey: publicKey.export({ type: 'spki', format: 'pem' }) as string,
        base64Cbor: await getBase64Cbor(opts.input.nonce),
      };
    }),
});
