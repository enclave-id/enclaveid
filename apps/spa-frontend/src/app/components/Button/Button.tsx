import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  label,
  fullWidth,
  ...rest
}) => {
  const className = `
    rounded-md font-medium leading-[22.4px] text-center
    ${
      variant === 'primary'
        ? 'bg-greenBg shadow text-white pt-[13px] pb-[12px]'
        : 'text-greenBg underline bg-transparent'
    }
    ${fullWidth ? 'w-full' : variant === 'primary' ? 'px-8' : ''}
  `;

  return (
    <button {...rest} className={className}>
      {label}
    </button>
  );
};
