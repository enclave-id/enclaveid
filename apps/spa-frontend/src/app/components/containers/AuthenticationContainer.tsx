import React, { ReactElement, useCallback } from 'react';
import { trpc } from '../../utils/trpc';
import { asymmetricEncrypt } from '../../utils/crypto/asymmetricBrowser';
import { AuthenticationFormProps } from '../AuthenticationForm';
import { useAzureAttestation } from '../../hooks/attestation/useAzureAttestation';
import { useNavigate } from 'react-router-dom';
export type AuthenticationType = 'login' | 'signup';

export function AuthenticationContainer({
  children,
  authenticationType,
}: {
  children: ReactElement<AuthenticationFormProps>;
  authenticationType: AuthenticationType;
}) {
  const authMutation =
    authenticationType === 'login'
      ? trpc.login.useMutation()
      : trpc.signup.useMutation();

  const { publicKey, error } = useAzureAttestation();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (email: string, password: string) => {
      const encryptedCredentials = await asymmetricEncrypt(
        {
          email,
          password,
        },
        publicKey,
      );

      await authMutation.mutate({
        encryptedCredentials,
      });

      if (authMutation.error) {
        console.error(authMutation.error);
      } else {
        // TODO: we should use loaders/actions here
        authenticationType === 'login' ? navigate('/dashboard') : navigate('/');
      }
    },
    [publicKey, authMutation, authenticationType],
  );

  return React.cloneElement(children, { handleSubmit, authenticationType });
}
