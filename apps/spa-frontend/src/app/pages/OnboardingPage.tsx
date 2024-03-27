import { FileUploadForm } from '../components/FileUploadForm';
import { FileUploadContainer } from '../components/containers/FileUploadContainer';

export function OnboardingPage() {
  return (
    <FileUploadContainer>
      <FileUploadForm />
    </FileUploadContainer>
  );
}
