import { AuthenticationForm } from '../components/AuthenticationForm';
import {
  AuthenticationContainer,
  AuthenticationType,
} from '../components/containers/AuthenticationContainer';

export function AuthenticationPage({
  authenticationType,
}: {
  authenticationType: AuthenticationType;
}) {
  return (
    <div className="min-h-screen bg-white p-[10%]">
      <AuthenticationContainer authenticationType={authenticationType}>
        <AuthenticationForm />
      </AuthenticationContainer>
    </div>
  );
}
