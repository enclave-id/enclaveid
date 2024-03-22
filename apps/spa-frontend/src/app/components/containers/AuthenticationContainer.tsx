import React, { ReactElement, useCallback } from 'react';
import { trpc } from '../../utils/trpc';
import { asymmetricEncrypt } from '../../utils/crypto/asymmetricBrowser';
import { AuthenticationFormProps } from '../AuthenticationForm';
import { useAzureAttestation } from '../../hooks/attestation/useAzureAttestation';

export type AuthenticationType = 'login' | 'signup';

export function AuthenticationContainer({
  children,
  authenticationType,
}: {
  children: ReactElement<AuthenticationFormProps>;
  authenticationType: AuthenticationType;
}) {
  const loginMutation = trpc.login.useMutation();
  const signupMutation = trpc.signup.useMutation();

  const { publicKey, error } = useAzureAttestation();

  const handleSubmit = useCallback(
    async (email: string, password: string) => {
      const encryptedCredentials = await asymmetricEncrypt(
        {
          email,
          password,
        },
        publicKey,
      );

      authenticationType === 'login'
        ? await loginMutation.mutate({
            encryptedCredentials,
          })
        : await signupMutation.mutate({
            encryptedCredentials,
          });
    },
    [authenticationType, publicKey, signupMutation, loginMutation],
  );

  return React.cloneElement(children, { handleSubmit, authenticationType });
}
