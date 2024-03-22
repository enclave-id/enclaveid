import { useEffect, useState } from 'react';
import {
  getEnclaveCryptoKey,
  parsePublicKey,
} from '../../utils/crypto/asymmetricBrowser';
import { trpc } from '../../utils/trpc';

export function useAzureAttestation(): {
  publicKey: CryptoKey | null;
  error: Error | null;
} {
  const [publicCryptoKey, setPublicCryptoKey] = useState<CryptoKey | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);

  const attestationQuery = trpc.getAttestation.useQuery({
    nonce: 'TODO',
  });

  const { base64Cbor, publicKey } = attestationQuery.data ?? {};

  // TODO validate attestation

  useEffect(() => {
    async function runAttestation() {
      const publicKeyBuffer = parsePublicKey(publicKey);

      getEnclaveCryptoKey(publicKeyBuffer).then(setPublicCryptoKey);
    }
    if (publicKey) runAttestation();
  }, [publicKey]);

  return {
    publicKey: publicCryptoKey,
    error: error,
  };
}
