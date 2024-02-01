export interface AuthenticationFormProps {
  handleSubmit: (email: string, password: string) => void;
}

export function AuthenticationForm(props: AuthenticationFormProps) {
  return (
    <div>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={() => props.handleSubmit('test', 'test')}>Login</button>
    </div>
  );
}
