import { ReactNode } from 'react';

interface IProps {
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ disabled, children, onClick }: IProps) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
