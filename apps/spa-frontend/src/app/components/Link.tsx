import { AnchorHTMLAttributes, FC } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underlined?: boolean;
}

const Link: FC<LinkProps> = ({ underlined = true, ...props }) => {
  const className = `text-greenBg text-center font-medium leading-[22.4px] ${
    underlined ? 'underline' : ''
  }`;

  return (
    <a {...props} className={className}>
      {props.children}
    </a>
  );
};

export default Link;
