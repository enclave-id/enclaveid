import classNames from 'classnames';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error';
  size?: 'small' | 'large';
}

function Button({
  variant = 'primary',
  label,
  fullWidth,
  size,
  ...rest
}: ButtonProps) {
  const primaryVariant =
    'bg-greenBg shadow text-white pt-[13px] pb-[12px] rounded-md px-8';
  const secondaryVariant = 'text-greenBg underline bg-transparent';
  const tertiaryVariant =
    'text-passiveLinkColor py-[7px] px-8 bg-white shadow rounded-lg';
  const secondarySmallSize = 'text-xs font-normal !leading-4';
  const errorVariant =
    'py-[11.5px] w-full text-center text-white leading-[18px] font-medium rounded-lg bg-[#A62F2F]';

  let variantClass;

  switch (variant) {
    case 'primary':
      variantClass = primaryVariant;
      break;
    case 'secondary':
      variantClass = secondaryVariant;
      break;
    case 'tertiary':
      variantClass = tertiaryVariant;
      break;
    case 'error':
      variantClass = errorVariant;
      break;
    default:
      break;
  }

  return (
    <button
      {...rest}
      className={classNames(
        'font-medium leading-[22.4px] text-center flex items-center justify-center',
        fullWidth && 'w-full',
        variantClass,
        variant === 'secondary' && size === 'small' && secondarySmallSize,
        size === 'large' && 'w-44 h-8',
      )}
    >
      {label}
    </button>
  );
}

export { Button };
