import React, { useCallback } from 'react';
import { trpc } from '../../utils/trpc';
import { asymmetricEncrypt } from '../../utils/confidentiality';
import { AuthenticationFormProps } from '../AuthenticationForm';
import { useAttestation } from '../../hooks/useAttestation';

export function AuthenticationContainer({
  children,
}: {
  children: (props: AuthenticationFormProps) => React.ReactNode;
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
        publicKey
      );

      await loginMutation.mutate({
        encryptedCredentials,
      });

      console.log('Logged in');
    },
    [loginMutation, publicKey]
  );

  return children({
    handleSubmit,
  });
}
