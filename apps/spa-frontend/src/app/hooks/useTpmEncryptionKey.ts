import { useValidateAttestation } from './useValidateAttestation';

export function useTpmEncryptionKey(rawAttestationJwt: string) {
  const parsedJwt = useValidateAttestation(rawAttestationJwt);

  return { tpmEncryptionKey: parsedJwt.tpmEncryptionKey };
}
