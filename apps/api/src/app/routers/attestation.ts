import * as tpm from '../services/tpm';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const attestation = router({
  getAttestation: publicProcedure
    .input(
      z.object({
        nonce: z.string(),
      })
    )
    .query((opts) => {
      const { nonce } = opts.input;

      const jwt = tpm.getAttestation(nonce);

      return { jwt };
    }),
});
