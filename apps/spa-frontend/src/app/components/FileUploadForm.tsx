import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { FacebookIcon, GoogleIcon, OpenAiIcon } from './Icons';
import { useDropzone } from 'react-dropzone';
import { FileUploadSection } from './FileUploadSection';
import { FormCardLayout } from './FormCardLayout';
import { Link } from './Link';

export interface FileUploadFormProps {
  validateFile?: (file: File) => boolean;
  handleFileUpload?: (file: File) => void;
}

export function FileUploadForm({
  handleFileUpload,
  validateFile,
}: FileUploadFormProps) {
  const [googleFiles, setGoogleFiles] = useState<File[]>([]);
  const googleUploadInputRef = useRef<HTMLInputElement | null>(null);
  const [isGoogleFileValid, setIsGoogleFileValid] = useState<boolean>(false);

  useEffect(() => {
    if (googleFiles.length > 0 && validateFile) {
      setIsGoogleFileValid(validateFile(googleFiles[googleFiles.length - 1]));
    }
  }, [googleFiles, validateFile]);

  const handleGoogleFiles = useCallback(function (acceptedFiles: File[]) {
    setGoogleFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  function removeLastGoogleFile() {
    setGoogleFiles((prevFiles) => prevFiles.slice(0, prevFiles.length - 1));
  }

  const googleDropzone = useDropzone({
    onDrop: handleGoogleFiles,
    noClick: true,
  });

  function openGoogleFileDialog() {
    googleUploadInputRef.current?.click();
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#F3F5F7]">
      <div className="flex flex-col gap-9 max-w-[597px] w-full mx-auto">
        <h1 className="text-[#6C7A8A] text-4xl font-medium leading-[-0.72px] text-center">
          Upload your data
        </h1>
        <FormCardLayout>
          <p className="description-text">
            To get started using EnclaveID you need to upload your personal
            data. Most data export tools take some time to generate the data
            archives, so feel free to close the window and come back later.
          </p>
          <div className="mt-9 flex flex-col gap-[18px]">
            <FileUploadSection
              files={googleFiles}
              removeLastFile={removeLastGoogleFile}
              dropzone={googleDropzone}
              uploadInputRef={googleUploadInputRef}
              openFileDialog={openGoogleFileDialog}
              icon={<GoogleIcon />}
              instructionLink="https://todo.google.com"
              description={
                <span>
                  Head over to{' '}
                  <a
                    href="https://takeout.google.com"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    takeout.google.com
                  </a>{' '}
                  to obtain a copy of your Google data and upload here the
                  archive. Make sure to select <b>My Activity</b> in <b>JSON</b>{' '}
                  format.
                </span>
              }
            />
            <div className="flex items-center gap-[17px] flex-row rounded-md bg-white shadow pl-[15px] pt-[17pt] pr-[18px] pb-5">
              <FacebookIcon />
              <span className="text-[#6C7A8A] text-lg">Coming soon</span>
            </div>
            <div className="mb-9 flex items-center gap-[17px] flex-row rounded-md bg-white shadow pl-[15px] pt-[17pt] pr-[18px] pb-5">
              <OpenAiIcon />
              <span className="text-[#6C7A8A] text-lg">Coming soon</span>
            </div>
          </div>
          <p className="description-text">
            Your data will be processed in a confindential environment, making
            it inaccessible by anyone other than yourself.{' '}
            <a
              href="https://github.com/enclaveid/enclaveid"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              Learn more
            </a>
          </p>
          <div className="mt-6 flex flex-col gap-[18px]">
            {isGoogleFileValid ? (
              <Button label="Next" fullWidth />
            ) : (
              <Link href="/">I'm waiting for the data export</Link>
            )}
          </div>
        </FormCardLayout>
      </div>
    </div>
  );
}
