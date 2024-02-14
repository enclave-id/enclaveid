import { Pin } from './Pin';

enum Label {
  VeryLow = 'Very Low',
  Low = 'Low',
  Average = 'Average',
  High = 'High',
  VeryHigh = 'Very High',
}

interface GradientLineProps {
  value: number;
  title: string;
  variant?: 'primary' | 'secondary';
}

function GradientLine({
  value,
  title,
  variant = 'primary',
}: GradientLineProps) {
  const getLabel = (value: number): Label => {
    if (value <= 20) return Label.VeryLow;
    else if (value <= 40) return Label.Low;
    else if (value <= 60) return Label.Average;
    else if (value <= 80) return Label.High;
    else return Label.VeryHigh;
  };

  const label = getLabel(value);

  const pinStyle = {
    left: `${value}%`,
    transform: 'translateX(-50%)',
  };

  const barColor =
    variant === 'primary'
      ? 'from-[#5799E6] to-[#2FA68A]'
      : 'from-[#C6DED8] to-[#C9DEEC]';

  return (
    <div
      className={`flex flex-col max-w-[490px] w-full ${
        variant === 'primary' ? 'gap-6' : 'gap-3'
      }`}
    >
      <div className="flex items-center justify-between">
        {variant === 'primary' ? (
          <>
            <span className="text-[#6C7A8A] font-medium leading-[19px]">
              {title}
            </span>
            <span className="text-greenBg font-medium leading-[19px]">
              {label}
            </span>
          </>
        ) : (
          <>
            <span className="text-[#5799E6] text-sm font-medium leading-4">
              Low
            </span>
            <span className="text-[#30A78A] text-sm font-medium leading-4">
              High
            </span>
          </>
        )}
      </div>
      <div className="flex gap-[18px] items-center">
        {variant === 'secondary' && (
          <span className="text-[#6C7A8A] font-medium leading-4 text-sm">
            {title}
          </span>
        )}
        <div
          className={`h-2.5 rounded-full w-full bg-gradient-to-r ${barColor} relative`}
        >
          <Pin style={pinStyle} variant={variant} />
        </div>
      </div>
    </div>
  );
}

export { GradientLine };
