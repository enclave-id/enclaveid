import { useState } from 'react';
import { Logo } from './Logo';
import { Input } from './Input';
import { Button } from './Button';
import { FormCardLayout } from './FormCardLayout';
import { AuthenticationType } from './containers/AuthenticationContainer';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 max-w-[478px] w-full mx-auto">
      <Logo />
      <FormCardLayout>
        {authenticationType === 'signup' && (
          <p className="description-text mb-[30px]">
            <b>Private alpha: </b>
            We are only accepting a limited cohort of users at this time. If you
            would like to request early access, please send us an email at{' '}
            <a
              href="mailto:contact@enclaveid.com"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              contact@enclaveid.com
            </a>
            .
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
        <div className="mt-5">
          <Button
            label={
              authenticationType === 'signup'
                ? 'Log In with existing account'
                : 'Sign Up for a new account'
            }
            variant="secondary"
            fullWidth
            onClick={() => {
              if (authenticationType === 'signup') {
                navigate('/login');
              } else {
                navigate('/signup');
              }
            }}
          />
        </div>
      </FormCardLayout>
    </div>
  );
}

export { AuthenticationForm };
