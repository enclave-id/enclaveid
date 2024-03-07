import { trpc } from '../utils/trpc';
import { AuthenticationContainer } from '../components/containers/AuthenticationContainer';
import { FileUploadContainer } from '../components/containers/FileUploadContainer';
import { symmetricDecrypt, symmetricEncrypt } from '../utils/confidentiality';
import { useEffect } from 'react';
import { useAttestation } from '../hooks/useAttestation';
import { AuthenticationForm } from '../components/AuthenticationForm';
import { FileUploadForm } from '../components/FileUploadForm';

export function E2eTest() {
  const { publicKey, error: attestationError } = useAttestation();

  const { mutate, data, isSuccess } = trpc.pingPong.useMutation();
  const pingChallenge = 'pingu';

  useEffect(() => {
    if (isSuccess) {
      symmetricDecrypt(data?.encryptedPayload, data?.nonce).then(
        (decryptedPayload) => {
          document.getElementById('pingpong-result').innerHTML =
            decryptedPayload['pong'] as string;
        },
      );
    }
  }, [data?.encryptedPayload, data?.nonce, isSuccess]);

  return (
    <div className="container flex flex-col justify-center mt-8">
      <p>Attestaition:</p>
      <div>Key: {publicKey && 'GOT KEY'}</div>
      <div>Error: {attestationError?.message}</div>

      <AuthenticationContainer>
        <AuthenticationForm />
      </AuthenticationContainer>

      <p>PingPong test:</p>
      <button
        onClick={() => {
          symmetricEncrypt({
            ping: pingChallenge,
          }).then(({ encryptedPayload, nonce }) => {
            mutate({
              encryptedPayload,
              nonce,
            });
          });
        }}
      >
        Run test
      </button>
      <p>Result:</p>
      <p id="pingpong-result"></p>

      <FileUploadContainer>
        <FileUploadForm />
      </FileUploadContainer>
    </div>
  );
}
