import React, { useCallback } from 'react';
import { trpc } from '../../utils/trpc';
import { parsePublicKey } from '../../utils/attestation';
import { asymmetricEncrypt } from '../../utils/confidentiality';
import { AuthenticationFormProps } from '../AuthenticationForm';

export function AuthenticationContainer({
  children,
}: {
  children: (props: AuthenticationFormProps) => React.ReactNode;
}) {
  const jwt = trpc.getAttestation.useQuery({ nonce: 'test' }).data?.jwt;
  const loginMutation = trpc.login.useMutation();

  const handleSubmit = useCallback(
    (email: string, password: string) => {
      if (!jwt) {
        throw new Error('Attestation JWT not found');
      }

      const pubKey = parsePublicKey(jwt);

      asymmetricEncrypt(
        {
          email,
          password,
        },
        pubKey
      ).then((encryptedCredentials) => {
        loginMutation.mutate({
          encryptedCredentials,
        });
      });
    },
    [loginMutation, jwt]
  );

  return children({
    handleSubmit,
  });
}
