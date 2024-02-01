export interface FileUploadComponentProps {
  validateFile: (file: File) => void;
  handleFileUpload: (file: File) => void;
}
