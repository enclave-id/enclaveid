import { Dropzone, FileMosaic } from '@files-ui/react';
import * as React from 'react';

interface FileUploadSectionProps {
  uploadUrl: string;
  onSuccess: () => void;
}

export function FileUploadSection(props: FileUploadSectionProps) {
  const { uploadUrl, onSuccess } = props;

  const [extFiles, setExtFiles] = React.useState([]);

  const updateFiles = (incommingFiles) => {
    console.log('incomming files', incommingFiles);
    setExtFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };
  const handleStart = (filesToUpload) => {
    console.log('advanced demo start upload', filesToUpload);
  };
  const handleFinish = (uploadedFiles) => {
    console.log('advanced demo finish upload', uploadedFiles);
    onSuccess();
  };
  const handleAbort = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: 'aborted' };
        } else return { ...ef };
      }),
    );
  };
  const handleCancel = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      }),
    );
  };
  return (
    <Dropzone
      onChange={updateFiles}
      minHeight="80px"
      value={extFiles}
      accept="application/zip"
      maxFiles={1}
      maxFileSize={200 * 1024 * 1024}
      label="Drag'n drop files here or click to browse"
      uploadConfig={{
        autoUpload: true,
        cleanOnUpload: true,
        headers: {
          'Content-Type': 'application/zip',
        },
        method: 'PUT',
        url: uploadUrl,
      }}
      onUploadStart={handleStart}
      onUploadFinish={handleFinish}
    >
      {extFiles.map((file) => (
        <FileMosaic
          {...file}
          key={file.id}
          onDelete={onDelete}
          onAbort={handleAbort}
          onCancel={handleCancel}
          resultOnTooltip
          alwaysActive
        />
      ))}
    </Dropzone>
  );
}
