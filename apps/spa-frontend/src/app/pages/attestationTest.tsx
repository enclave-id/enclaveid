import { useAttestation } from '../hooks/useAttestation';
import { useGoWasm } from '../hooks/useGoWasm';

export function AttestationTest() {
  const { isReady, error: wasmError } = useGoWasm('./nitrite.wasm');
  const { publicKey, error: attestationError } = useAttestation(isReady);

  return (
    <div>
      <h1>Attestation Test</h1>
      {publicKey && <p>Public Key: {publicKey}</p>}
      {
        <p>
          Errors: {wasmError?.message} | {attestationError?.message}
        </p>
      }
    </div>
  );
}
