import { ReactElement, cloneElement, useCallback } from 'react';
import { validateGoogleTakoutZip } from '../../utils/archiveValidation';
import { FileUploadFormProps } from '../FileUploadForm';
import { trpc } from '../../utils/trpc';
import { DataProvider } from '@enclaveid/shared';

export function FileUploadContainer({
  children,
}: {
  children: ReactElement<FileUploadFormProps>;
}) {
  const uploadUrlQuery = trpc.private.getUploadUrl.useQuery({
    dataProvider: DataProvider.GOOGLE,
  });

  const handleFileUpload = useCallback(
    async (zipFile: File) => {
      if (!uploadUrlQuery.data.url) {
        throw new Error('No upload URL available');
      }

      const response = await fetch(uploadUrlQuery.data.url, {
        method: 'PUT',
        body: zipFile,
        headers: {
          'Content-Type': 'application/zip',
        },
      });
    },
    [uploadUrlQuery.data],
  );

  return cloneElement(children, {
    handleFileUpload,
    validateFile: validateGoogleTakoutZip,
  });
}
