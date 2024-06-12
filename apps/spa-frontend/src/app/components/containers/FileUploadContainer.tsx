import { ReactElement, cloneElement } from 'react';
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

  return cloneElement(children, {
    uploadUrl: uploadUrlQuery.data?.url,
  });
}
