import React, { useCallback } from 'react';
import { trpc } from '../../utils/trpc';
import { parsePublicKey } from '../../utils/attestation';
import { asymmetricEncrypt } from '../../utils/confidentiality';
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
