import { FileUploadForm } from '../components/FileUploadForm';
import { FileUploadContainer } from '../components/containers/FileUploadContainer';
import { RequireAuth } from '../providers/AuthProvider';

export function FileUploadPage() {
  return (
    <RequireAuth>
      <FileUploadContainer>
        <FileUploadForm />
      </FileUploadContainer>
    </RequireAuth>
  );
}
