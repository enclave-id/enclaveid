export interface AuthenticationComponentProps {
  handleSubmit: (email: string, password: string) => void;
}

export interface FileUploadComponentProps {
  validateFile: (file: File) => void;
  handleFileUpload: (file: File) => void;
}
