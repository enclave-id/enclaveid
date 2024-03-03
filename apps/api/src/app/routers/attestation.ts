import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { getPublicKey } from '../services/asymmetricCrypto';
import axios from 'axios';

export const attestation = router({
  getAttestation: publicProcedure
    .input(
      z.object({
        nonce: z.string(),
      }),
    )
    .query(async (opts) => {
      const { nonce } = opts.input;

      const cbor = await axios.get(
        'https://192.168.127.2/enclave/attestation?nonce=' + nonce,
      );

      return {
        publicKey: await getPublicKey(),
        attestation: '',
      };
    }),
});
