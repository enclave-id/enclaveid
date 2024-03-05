import React, { useCallback } from 'react';
import { FileUploadComponentProps } from '../../types/components';
import { validateGoogleTakoutZip } from '../../utils/archiveValidation';

export function FileUploadContainer({
  children,
}: {
  children: (props: FileUploadComponentProps) => React.ReactNode;
}) {
  const handleFileUpload = useCallback((zipFile: File) => {}, []);

  return children({
    handleFileUpload,
    validateFile: validateGoogleTakoutZip,
  });
}
