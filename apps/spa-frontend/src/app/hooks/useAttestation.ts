import { useState, useEffect } from 'react';
import {
  decodeAttestation,
  expectedPcr0,
  getb64PublicKeyDigest,
} from '../utils/attestation';
import { generateNonce } from '../utils/confidentiality';
import { trpc } from '../utils/trpc';

export function useAttestation() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function validateAttestation() {
      try {
        const attestationQuery = await trpc.getAttestation.useQuery({
          nonce: Buffer.from(generateNonce()).toString('hex'),
        });

        const { publicKey, base64Cbor } = attestationQuery.data ?? {};

        if (!base64Cbor) {
          throw new Error('Missing attestation data');
        }

        const { pcr0, nonce, b64PublicKeyDigest } =
          decodeAttestation(base64Cbor);

        // Validate the attestation
        if (nonce !== attestationQuery.data?.nonce) {
          throw new Error(
            `Invalid nonce value: ${nonce}. Expected: ${attestationQuery.data?.nonce}`
          );
        }

        if (pcr0 !== expectedPcr0) {
          throw new Error(
            `Invalid PCR0 value: ${pcr0}. Expected: ${expectedPcr0}`
          );
        }

        const expectedb64PublicKeyDigest = await getb64PublicKeyDigest(
          publicKey
        );
        if (b64PublicKeyDigest !== expectedb64PublicKeyDigest) {
          throw new Error(
            `Invalid public key digest value: ${b64PublicKeyDigest}. Expected: ${expectedb64PublicKeyDigest}`
          );
        }

        setPublicKey(publicKey);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }

    validateAttestation();
  }, []);

  return { publicKey, error };
}
