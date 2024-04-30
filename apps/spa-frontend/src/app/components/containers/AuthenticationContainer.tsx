import React, { ReactElement, useCallback } from 'react';
import { trpc } from '../../utils/trpc';
import { asymmetricEncrypt } from '../../utils/crypto/asymmetricBrowser';
import { AuthenticationFormProps } from '../AuthenticationForm';
import { useNavigate } from 'react-router-dom';
import { useAwsNitroAttestation } from '../../hooks/attestation/useAwsNitroAttestation';
import { getSessionKey } from '../../utils/crypto/symmetricBrowser';
import { Buffer } from 'buffer';

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
      ? trpc.public.login.useMutation()
      : trpc.public.signup.useMutation();

  // TODO change to Azure
  const { publicKey, error } = useAwsNitroAttestation();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (email: string, password: string) => {
      const encryptedCredentials = await asymmetricEncrypt(
        {
          email,
          password,
          b64SessionKey: Buffer.from(getSessionKey()).toString('base64'),
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
    [publicKey, authMutation, authenticationType, navigate],
  );

  return React.cloneElement(children, { handleSubmit, authenticationType });
}
