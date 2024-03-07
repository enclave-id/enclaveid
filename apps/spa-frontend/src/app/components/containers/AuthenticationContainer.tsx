import React, { ReactElement, useCallback } from 'react';
import { trpc } from '../../utils/trpc';
import { asymmetricEncrypt } from '../../utils/crypto/asymmetricBrowser';
import { AuthenticationFormProps } from '../AuthenticationForm';
import { useAttestation } from '../../hooks/useAttestation';

export function AuthenticationContainer({
  children,
}: {
  children: ReactElement<AuthenticationFormProps>;
}) {
  const loginMutation = trpc.login.useMutation();

  const { publicKey, error } = useAttestation();

  const handleSubmit = useCallback(
    async (email: string, password: string) => {
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

      console.log('Logged in');
    },
    [loginMutation, publicKey],
  );

  return React.cloneElement(children, { handleSubmit });
}
