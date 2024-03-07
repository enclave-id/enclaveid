import { useState, useEffect } from 'react';
import {
  decodeAttestation,
  getPublicKeyHashBrowser,
} from '../utils/attestation/attestation';
import { trpcClient } from '../utils/trpc';
import { useGoWasm } from './useGoWasm';
import { getExpectedMesaurements } from '../utils/attestation/measurements';
import { getEnclaveCryptoKey, parsePublicKey } from '../utils/confidentiality';

export function useAttestation(): {
  publicKey: CryptoKey | null;
  error: Error | null;
} {
  const [publicKey, setPublicKey] = useState<CryptoKey | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { isReady, error: wasmError } = useGoWasm('./nitrite.wasm');

  useEffect(() => {
    if (wasmError) setError(wasmError);
  }, [wasmError]);

  useEffect(() => {
    async function runAttestation() {
      if (!isReady) return;

      try {
        const { expectedNonce, expectedPcr0 } = getExpectedMesaurements();

        const attestationQuery = await trpcClient.getAttestation.query({
          nonce: expectedNonce,
        });

        const { publicKey, base64Cbor } = attestationQuery ?? {};

        if (!publicKey) throw new Error('Missing public key');
        if (!base64Cbor) throw new Error('Missing attestation data');

        // Validate the signature and decode the attestation document
        const { result: validationResult, error: validationError } = JSON.parse(
          window.validateAttestation(
            base64Cbor,
            process.env.NODE_ENV === 'development',
          ),
        );
        if (validationError !== '') throw new Error(validationError);

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

        const publicKeyBuffer = await parsePublicKey(publicKey);

        const expectedb64PublicKeyDigest =
          await getPublicKeyHashBrowser(publicKeyBuffer);

        if (b64PublicKeyDigest !== expectedb64PublicKeyDigest) {
          throw new Error(
            `Invalid public key digest value: ${b64PublicKeyDigest}. Expected: ${expectedb64PublicKeyDigest}`,
          );
        }

        const cryptoKey = await getEnclaveCryptoKey(publicKeyBuffer);

        setPublicKey(cryptoKey);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }

        throw e;
      }
    }

    runAttestation();
  }, [isReady]);

  return { publicKey, error };
}
