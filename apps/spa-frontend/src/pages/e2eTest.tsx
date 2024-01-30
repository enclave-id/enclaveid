import { trpc } from '../utils/trpc';
import { AuthenticationContainer } from '../components/AuthenticationContainer';
import { FileUploadContainer } from '../components/FileUploadContainer';

export function E2eTest() {
  const attestationQuery = trpc.getAttestation.useQuery({ nonce: 'test' });

  return (
    <div>
      <div className="flex justify-center mt-8">
        <button>Get Attestation</button>
        <div id="attestation">{attestationQuery.data?.jwt}</div>

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

        <input type="file" id="myFile" name="filename"></input>
        <button>Upload files</button>
      </div>
    </div>
  );
}
