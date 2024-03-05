import { useState, useEffect } from 'react';
import {
  decodeAttestation,
  expectedPcr0,
  getb64PublicKeyDigest,
} from '../utils/attestation';
import { generateNonce } from '../utils/confidentiality';
import { trpcClient } from '../utils/trpc';
import { Buffer } from 'buffer';
// @ts-expect-error TODO idk why but vite won't compile without the .ts
import { mockNonce } from 'apps/api/src/app/services/mocks.ts';

const debug = process.env.NODE_ENV === 'development';

export function useAttestation(isWasmReady: boolean): {
  publicKey: string | null;
  error: Error | null;
} {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function runAttestation() {
      if (!isWasmReady) return;

      try {
        const expectedNonce = debug
          ? mockNonce
          : Buffer.from(generateNonce()).toString('hex');

        const attestationQuery = await trpcClient.getAttestation.query({
          nonce: expectedNonce,
        });

        const { publicKey, base64Cbor } = attestationQuery ?? {};

        if (!publicKey) throw new Error('Missing public key');
        if (!base64Cbor) throw new Error('Missing attestation data');

        const { result: validationResult, error: validationError } = JSON.parse(
          window.validateAttestation(base64Cbor, debug),
        );
        if (validationError !== '') throw new Error(validationError);

        console.log('Attestation validation result:', validationResult);

        // Validate the attestation contents
        const { pcr0, nonce, b64PublicKeyDigest } =
          decodeAttestation(validationResult);

        if (nonce !== expectedNonce) {
          throw new Error(
            `Invalid nonce value: ${nonce}. Expected: ${expectedNonce}`,
          );
        }

        if (pcr0 !== expectedPcr0) {
          throw new Error(
            `Invalid PCR0 value: ${pcr0}. Expected: ${expectedPcr0}`,
          );
        }

        const expectedb64PublicKeyDigest =
          await getb64PublicKeyDigest(publicKey);
        if (b64PublicKeyDigest !== expectedb64PublicKeyDigest) {
          throw new Error(
            `Invalid public key digest value: ${b64PublicKeyDigest}. Expected: ${expectedb64PublicKeyDigest}`,
          );
        }

        setPublicKey(publicKey);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }

        throw e;
      }
    }

    runAttestation();
  }, [isWasmReady]);

  return { publicKey, error };
}
