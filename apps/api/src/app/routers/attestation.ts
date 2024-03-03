import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { getPublicKey } from '../services/asymmetricCrypto';
import { getBase64Cbor } from '../services/attestation';

export const attestation = router({
  getAttestation: publicProcedure
    .input(
      z.object({
        nonce: z.string(),
      })
    )
    .query(async (opts) => {
      return {
        publicKey: await getPublicKey(),
        base64Cbor: await getBase64Cbor(opts.input.nonce),
      };
    }),
});
