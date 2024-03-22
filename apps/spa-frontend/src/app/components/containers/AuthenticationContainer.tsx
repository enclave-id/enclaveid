import React, { ReactElement, useCallback } from 'react';
import { trpc } from '../../utils/trpc';
import { asymmetricEncrypt } from '../../utils/crypto/asymmetricBrowser';
import { AuthenticationFormProps } from '../AuthenticationForm';
import toast from 'react-hot-toast';
import { useAwsNitroAttestation } from '../../hooks/useAwsNitroAttestation';

export type AuthenticationType = 'login' | 'signup';

export function AuthenticationContainer({
  children,
  authenticationType,
}: {
  children: ReactElement<AuthenticationFormProps>;
  authenticationType: AuthenticationType;
}) {
  const loginMutation = trpc.login.useMutation();

  const { publicKey, error } = useAwsNitroAttestation();

  const handleSubmit = useCallback(
    process.env.NODE_ENV === 'prodcution'
      ? async (email: string, password: string) => {
          const encryptedCredentials = await asymmetricEncrypt(
            {
              email,
              password,
            },
            publicKey,
          );

          await loginMutation.mutate({
            encryptedCredentials,
          });
        }
      : (email: string, password: string) => {
          toast.error('User not in whitelist: ' + email);
        },
    [loginMutation, publicKey],
  );

  return React.cloneElement(children, { handleSubmit, authenticationType });
}
