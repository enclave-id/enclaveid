import { ReactElement, cloneElement, useCallback } from 'react';
import { validateGoogleTakoutZip } from '../../utils/archiveValidation';
import { FileUploadFormProps } from '../FileUploadForm';

export function FileUploadContainer({
  children,
}: {
  children: ReactElement<FileUploadFormProps>;
}) {
  const handleFileUpload = useCallback((zipFile: File) => {}, []);

  return cloneElement(children, {
    handleFileUpload,
    validateFile: validateGoogleTakoutZip,
  });
}
