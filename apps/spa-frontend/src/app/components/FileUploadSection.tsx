import { Button } from './Button';
import { UploadIcon } from './Icons';

import { DropzoneState } from 'react-dropzone';
import { MutableRefObject } from 'react';
import { Dropzone } from './Dropzone';

interface FileUploadSectionProps {
  files: File[];
  removeLastFile: () => void;
  dropzone: DropzoneState;
  uploadInputRef: MutableRefObject<HTMLInputElement | null>;
  openFileDialog: () => void;
  icon: JSX.Element;
  description: JSX.Element;
  instructionLink: string;
}

function FileUploadSection({
  files,
  removeLastFile,
  dropzone,
  uploadInputRef,
  openFileDialog,
  icon,
  description,
  instructionLink,
}: FileUploadSectionProps) {
  return (
    <Dropzone dropzone={dropzone} ref={uploadInputRef}>
      <div className="flex flex-col gap-[9px]">
        <div className="flex items-center gap-[17px]">
          <button className="w-[55px] h-[55px]">{icon}</button>
          <span className="text-[#6C7A8A] text-sm">{description}</span>
        </div>
        {files.length > 0 ? (
          <div className="bg-white py-[23px] flex flex-col gap-[11px] border border-[#E5E8EE] rounded-xl">
            {files.map((file) => (
              <span className="text-[#6C7A8A] text-center text-xs">
                {file.name} has been uploaded.
              </span>
            ))}
            <div className="flex flex-col gap-1.5">
              <Button label="Download file" variant="secondary" size="small" />
              <Button
                label="Remove file"
                variant="secondary"
                size="small"
                onClick={removeLastFile}
              />
            </div>
          </div>
        ) : (
          <div
            onClick={openFileDialog}
            className="cursor-pointer bg-[#F4F5F7] border border-[#E5E8EE] rounded-xl flex flex-col items-center justify-center pt-[21px] pb-[27px] gap-2"
          >
            <button>
              <UploadIcon />
            </button>
            <p className="max-w-[236px] text-xs text-[#6C7A8A] text-center">
              Drag & drop your file here or click to select from your device
            </p>
          </div>
        )}
        <span className="text-[#6C7A8A] text-md underline text-center mt-3">
          <a href={instructionLink} target="_blank" rel="noreferrer">
            Show instruction video
          </a>
        </span>
      </div>
    </Dropzone>
  );
}
export { FileUploadSection };
