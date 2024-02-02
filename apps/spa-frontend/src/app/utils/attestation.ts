import * as jose from 'jose';

export function fetch(attestationJwt: string): CryptoKey {
  //const decoded = jwt.decode(attestationJwt, { complete: true });

  const decoded = jose.decodeJwt(attestationJwt);

  console.log(decoded);

  return new CryptoKey();
}

export async function validateAttestationJwt(attestationJwt: string): Promise<{
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
}
