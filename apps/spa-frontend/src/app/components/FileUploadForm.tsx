import { useCallback, useRef, useState } from 'react';
import { Button } from './Button';
import { FacebookIcon, GoogleIcon } from './Icons';
import { useDropzone } from 'react-dropzone';
import { FileUploadSection } from './FileUploadSection';
import { FormCardLayout } from './FormCardLayout';
import { Link } from './Link';

export interface FileUploadFormProps {
  validateFile?: (file: File) => void;
  handleFileUpload?: (file: File) => void;
}

export function FileUploadForm({
  handleFileUpload,
  validateFile,
}: FileUploadFormProps) {
  const [googleFiles, setGoogleFiles] = useState<File[]>([]);
  const [facebookFiles, setFacebookFiles] = useState<File[]>([]);
  const googleUploadInputRef = useRef<HTMLInputElement | null>(null);
  const facebookUploadInputRef = useRef<HTMLInputElement | null>(null);

  const handleGoogleFiles = useCallback(function (acceptedFiles: File[]) {
    setGoogleFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleFacebookFiles = useCallback(function (acceptedFiles: File[]) {
    setFacebookFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  function removeLastGoogleFile() {
    setGoogleFiles((prevFiles) => prevFiles.slice(0, prevFiles.length - 1));
  }

  function removeLastFacebookFile() {
    setFacebookFiles((prevFiles) => prevFiles.slice(0, prevFiles.length - 1));
  }

  const googleDropzone = useDropzone({
    onDrop: handleGoogleFiles,
    noClick: true,
  });

  const facebookDropzone = useDropzone({
    onDrop: handleFacebookFiles,
    noClick: true,
  });

  function openGoogleFileDialog() {
    googleUploadInputRef.current?.click();
  }

  function openFacebookFileDialog() {
    facebookUploadInputRef.current?.click();
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#F3F5F7]">
      <div className="flex flex-col gap-9 max-w-[597px] w-full mx-auto">
        <h1 className="text-[#6C7A8A] text-4xl font-medium leading-[-0.72px] text-center">
          Upload your data files
        </h1>
        <FormCardLayout>
          <p className="description-text">
            Your credentials will only be used for Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <div className="mt-9 flex flex-col gap-[18px]">
            <FileUploadSection
              files={googleFiles}
              removeLastFile={removeLastGoogleFile}
              dropzone={googleDropzone}
              uploadInputRef={googleUploadInputRef}
              openFileDialog={openGoogleFileDialog}
              icon={<GoogleIcon />}
              description="Your Google data will only be used for Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <FileUploadSection
              files={facebookFiles}
              removeLastFile={removeLastFacebookFile}
              dropzone={facebookDropzone}
              uploadInputRef={facebookUploadInputRef}
              openFileDialog={openFacebookFileDialog}
              icon={<FacebookIcon />}
              description="Your Facebook data will only be used for Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>
          <div className="mt-6 flex flex-col gap-[18px]">
            <Button label="Upload Data" fullWidth />
            <Link href="/">I want to learn more</Link>
          </div>
        </FormCardLayout>
      </div>
    </div>
  );
}
