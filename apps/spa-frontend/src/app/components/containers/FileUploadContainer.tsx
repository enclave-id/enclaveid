import { ReactElement, cloneElement } from 'react';
import { FileUploadFormProps } from '../FileUploadForm';
import { trpc } from '../../utils/trpc';
import { DataProvider } from '@enclaveid/shared';
import { useLocation, useNavigate } from 'react-router-dom';

export function FileUploadContainer({
  children,
}: {
  children: ReactElement<FileUploadFormProps>;
}) {
  const uploadUrlQuery = trpc.private.getUploadUrl.useQuery({
    dataProvider: DataProvider.GOOGLE,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const goToQuestionnaire = () => {
    navigate('/questionnaire', { state: { from: location } });
  };

  return cloneElement(children, {
    uploadUrl: uploadUrlQuery.data?.url,
    onNext: goToQuestionnaire,
    onSkip: goToQuestionnaire,
  });
}
