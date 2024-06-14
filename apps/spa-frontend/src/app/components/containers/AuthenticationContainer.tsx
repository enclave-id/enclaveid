import React, { ReactElement, useCallback } from 'react';
import { trpc } from '../../utils/trpc';
import { asymmetricEncrypt } from '../../utils/crypto/asymmetricBrowser';
import { AuthenticationFormProps } from '../AuthenticationForm';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();

  // In the login case, we might want to redirect the user to the page they were trying to access
  const { from } = location.state || { from: { pathname: '/dashboard' } };

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

      console.log(from);

      if (authMutation.error) {
        // TODO: error handling
        console.error(authMutation.error);
      } else {
        // TODO: we should use loaders/actions ?
        authenticationType === 'login'
          ? navigate(from.pathname)
          : navigate('/fileUpload');
      }
    },
    [publicKey, authMutation, authenticationType, navigate, from],
  );

  return React.cloneElement(children, { handleSubmit, authenticationType });
}
