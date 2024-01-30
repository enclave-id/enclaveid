import { trpc } from '../utils/trpc';
import { asymmetricEncrypt } from '../utils/confidentiality';
import { AuthenticationContainer } from '../components/AuthenticationContainer';

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

        <input type="file" id="myFile" name="filename"></input>
        <button>Upload files</button>

        <div id="contents"></div>
      </div>
    </div>
  );
}
