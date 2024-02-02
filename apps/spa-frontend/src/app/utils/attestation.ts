import * as jose from 'jose';

export function parsePublicKey(attestationJwt: string): CryptoKey {
  //const decoded = jwt.decode(attestationJwt, { complete: true });

  const decoded = jose.JWT.decode(attestationJwt, { complete: true });

  console.log(decoded);

  return new CryptoKey();
}
