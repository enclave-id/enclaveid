import { useCallback, useRef, useState } from 'react';
import { Button } from './Button';
import CardLayout from './CardLayout';
import { FacebookIcon, GoogleIcon } from './Icons';
import Link from './Link';
import { useDropzone } from 'react-dropzone';
import { FileUploadSection } from './FileUploadSection';

const UploadForm = () => {
  const [googleFiles, setGoogleFiles] = useState<File[]>([]);
  const [facebookFiles, setFacebookFiles] = useState<File[]>([]);
  const googleUploadInputRef = useRef<HTMLInputElement | null>(null);
  const facebookUploadInputRef = useRef<HTMLInputElement | null>(null);

  const handleGoogleFiles = useCallback((acceptedFiles: File[]) => {
    setGoogleFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleFacebookFiles = useCallback((acceptedFiles: File[]) => {
    setFacebookFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeLastGoogleFile = () => {
    setGoogleFiles((prevFiles) => prevFiles.slice(0, prevFiles.length - 1));
  };

  const removeLastFacebookFile = () => {
    setFacebookFiles((prevFiles) => prevFiles.slice(0, prevFiles.length - 1));
  };

  const googleDropzone = useDropzone({
    onDrop: handleGoogleFiles,
    noClick: true,
  });

  const facebookDropzone = useDropzone({
    onDrop: handleFacebookFiles,
    noClick: true,
  });

  const openGoogleFileDialog = () => {
    googleUploadInputRef.current?.click();
  };

  const openFacebookFileDialog = () => {
    facebookUploadInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-9 max-w-[597px] w-full mx-auto">
      <h1 className="text-[#6C7A8A] text-4xl font-medium leading-[-0.72px] text-center">
        Upload your data files
      </h1>
      <CardLayout>
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
      </CardLayout>
    </div>
  );
};

export default UploadForm;
