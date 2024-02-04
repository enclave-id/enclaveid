import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fullWidth?: boolean;
}

export const Input: FC<InputProps> = ({ label, fullWidth, ...rest }) => {
  return (
    <div>
      <label
        htmlFor={rest.id}
        className="text-[#6C7A8A] text-sm font-medium leading-[19.6px] block"
      >
        {label}
      </label>
      <div className="mt-[2px]">
        <input
          {...rest}
          className={`block pt-2.5 pb-[11px] pl-[13px] pr-6 rounded-md border border-[#E5E8EE] bg-[#F3F5F7] text-black focus:outline-none ${
            fullWidth ? 'w-full' : 'px-20'
          }`}
        />
      </div>
    </div>
  );
};
