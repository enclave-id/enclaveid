import { useState } from 'react';
import { Logo } from './Logo';
import { Input } from './Input';
import { Button } from './Button';
import { FormCardLayout } from './FormCardLayout';
import { AuthenticationType } from './containers/AuthenticationContainer';

export interface AuthenticationFormProps {
  handleSubmit?: (email: string, password: string) => void;
  authenticationType?: AuthenticationType;
}

function AuthenticationForm({
  handleSubmit,
  authenticationType,
}: AuthenticationFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col gap-10 max-w-[478px] w-full mx-auto">
      <Logo />
      <FormCardLayout>
        {authenticationType === 'signup' && (
          <p className="description-text mb-[30px]">
            EnclaveID does not have an user agreement. By signing up, you agree
            to your data being processed as described in the open source code.
            The execution of the code and confidentiality of your data is
            guaranteed by confidential computing technology built on AWS Nitro
            Enclaves.
          </p>
        )}
        <div className="flex flex-col gap-5">
          <Input
            label="Email"
            placeholder="yourmail@gmail.com"
            type="email"
            id="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            placeholder="**********"
            type="password"
            id="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mt-5">
          <Button
            label={authenticationType === 'signup' ? 'Sign Up' : 'Log In'}
            fullWidth
            onClick={() => {
              if (handleSubmit) handleSubmit(email, password);
            }}
          />
        </div>
      </FormCardLayout>
    </div>
  );
}

export { AuthenticationForm };
