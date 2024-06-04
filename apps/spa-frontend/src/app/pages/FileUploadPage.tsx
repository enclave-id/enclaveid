import { FileUploadForm } from '../components/FileUploadForm';
import { FileUploadContainer } from '../components/containers/FileUploadContainer';

export function FileUploadPage() {
  return (
    <FileUploadContainer>
      <FileUploadForm />
    </FileUploadContainer>
  );
}
