import { useAttestation } from '../hooks/useAttestation';

export function AttestationTest() {
  const { publicKey, error: attestationError } = useAttestation();

  return (
    <div>
      <h1>Attestation Test</h1>
      {publicKey && <p>Public Key: {publicKey}</p>}
      {<p>Errors: {attestationError?.message}</p>}
    </div>
  );
}
