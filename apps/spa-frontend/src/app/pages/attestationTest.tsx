import { useAttestation } from '../hooks/useAttestation';

export function AttestationTest() {
  const { publicKey, error } = useAttestation();

  return (
    <div>
      <h1>Attestation Test</h1>
      {publicKey && <p>Public Key: {publicKey}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
