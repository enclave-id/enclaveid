import classNames from 'classnames';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small';
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
    default:
      break;
  }

  return (
    <button
      {...rest}
      className={classNames(
        'font-medium leading-[22.4px] text-center',
        fullWidth && 'w-full',
        variantClass,
        variant === 'secondary' && size === 'small' && secondarySmallSize
      )}
    >
      {label}
    </button>
  );
}

export { Button };
