import { trpc } from '../utils/trpc';
import { AuthenticationContainer } from '../components/containers/AuthenticationContainer';
import { FileUploadContainer } from '../components/containers/FileUploadContainer';
import { symmetricDecrypt, symmetricEncrypt } from '../utils/confidentiality';
import { useEffect } from 'react';

export function E2eTest() {
  const attestationQuery = trpc.getAttestation.useQuery({ nonce: 'test' });

  const { mutate, data, isSuccess } = trpc.pingPong.useMutation();
  const pingChallenge = 'pingu';

  useEffect(() => {
    if (isSuccess) {
      symmetricDecrypt(data?.encryptedPayload, data?.nonce).then(
        (decryptedPayload) => {
          document.getElementById('pingpong-result')!.innerHTML =
            decryptedPayload['pong'] as string;
        }
      );
    }
  }, [data?.encryptedPayload, data?.nonce, isSuccess]);

  return (
    <div className="container">
      <div className="flex justify-center mt-8">
        <p>Attestaition:</p>
        {/* <div id="attestation">{attestationQuery.data?.jwt}</div> */}

        <AuthenticationContainer>
          {({ handleSubmit }) => {
            return (
              <div>
                <input id="email" type="email"></input>
                <input id="password" type="password"></input>
                <button
                  onClick={() => {
                    handleSubmit(
                      (document.getElementById('email') as HTMLInputElement)
                        .value,
                      (document.getElementById('password') as HTMLInputElement)
                        .value
                    );
                  }}
                >
                  Login
                </button>
              </div>
            );
          }}
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
          {({ handleFileUpload, validateFile }) => {
            return (
              <div>
                <input
                  id="fileUpload"
                  type="file"
                  accept=".zip"
                  multiple={false}
                ></input>
                <button
                  onClick={(event) => {
                    const zipFile = (event.target as HTMLInputElement)
                      ?.files?.[0];

                    if (zipFile) handleFileUpload(zipFile);
                  }}
                  onChange={(event) => {
                    const zipFile = (event.target as HTMLInputElement)
                      ?.files?.[0];

                    if (zipFile) validateFile(zipFile);
                  }}
                >
                  Upload
                </button>
              </div>
            );
          }}
        </FileUploadContainer>
      </div>
    </div>
  );
}
