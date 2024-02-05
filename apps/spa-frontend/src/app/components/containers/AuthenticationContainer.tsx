import React, { useCallback } from 'react';
import { trpc } from '../../utils/trpc';
import { asymmetricEncrypt } from '../../utils/confidentiality';
import { AuthenticationFormProps } from '../AuthenticationForm';
import { useTpmEncryptionKey } from '../../hooks/useTpmEncryptionKey';

export function AuthenticationContainer({
  children,
}: {
  children: (props: AuthenticationFormProps) => React.ReactNode;
}) {
  const jwt = trpc.getAttestation.useQuery({ nonce: 'test' }).data?.jwt;
  const loginMutation = trpc.login.useMutation();

  const { tpmEncryptionKey } = useTpmEncryptionKey(jwt);

  const handleSubmit = useCallback(
    async (email: string, password: string) => {
      if (!tpmEncryptionKey) {
        throw new Error('Attestation JWT not found');
      }

      const encryptedCredentials = await asymmetricEncrypt(
        {
          email,
          password,
        },
        tpmEncryptionKey
      );

      await loginMutation.mutate({
        encryptedCredentials,
      });

      console.log('Logged in');
    },
    [loginMutation, tpmEncryptionKey, jwt]
  );

  return children({
    handleSubmit,
  });
}
