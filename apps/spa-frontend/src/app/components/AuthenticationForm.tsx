import { useState } from 'react';
import { Logo } from './Logo';
import { Input } from './Input';
import { Button } from './Button';
import { CardLayout } from './CardLayout';

export interface AuthenticationFormProps {
  handleSubmit: (email: string, password: string) => void;
}

function AuthenticationForm({ handleSubmit }: AuthenticationFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col gap-10 max-w-[478px] w-full mx-auto">
      <Logo />
      <CardLayout>
        <p className="description-text">
          Your credentials will only be used for Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Fusce eget condimentum augue. Aenean
          elementum commodo varius.
        </p>
        <div className="flex flex-col gap-5 mt-[30px]">
          <Input
            label="Email"
            placeholder="yourmail@gmail.com"
            type="email"
            id="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="**********"
            type="password"
            id="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <Button
            label="Sign Up"
            fullWidth
            onClick={() => handleSubmit(email, password)}
          />
        </div>
      </CardLayout>
    </div>
  );
}

export { AuthenticationForm };
