import { useMemo } from 'react';

const certificateUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://sharedeus2.eus2.attest.azure.net/certs'
    : 'http://localhost:7071';

export function useValidateAttestation() {
  return useMemo(() => {
    return async function validateAttestationJwt(
      attestationJwt: string
    ): Promise<{
      tpmEncryptionKey: CryptoKey;
    }> {
      const publicKey = await jose.importJWK(jwk, alg);

      const { payload, protectedHeader } = await jose.jwtVerify(
        attestationJwt,
        publicKey,
        {
          issuer: 'urn:example:issuer',
          audience: 'urn:example:audience',
        }
      );

      return true;
    };
  }, []);
}
