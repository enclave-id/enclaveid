import SVGLogo from './SVGLogo';

interface LogoProps {
  withoutIcon?: boolean;
}

function Logo({ withoutIcon }: LogoProps) {
  return (
    <div className="flex items-center justify-center gap-[18px]">
      {!withoutIcon && <SVGLogo />}
      <span className="text-[#2FA68A] font-medium tracking-[-0.72px] leading-normal text-4xl">
        EnclaveID
      </span>
    </div>
  );
}

export { Logo };
