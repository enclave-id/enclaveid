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
}

function GradientLine({ value, title }: GradientLineProps) {
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

  return (
    <div className="flex flex-col gap-7 max-w-[490px] w-full">
      <div className="flex items-center justify-between">
        <span className="text-[#6C7A8A] font-medium leading-[19px]">
          {title}
        </span>
        <span className="text-greenBg font-medium leading-[19px]">{label}</span>
      </div>
      <div className="h-2.5 rounded-full w-full bg-gradient-to-r from-[#5799E6] to-[#2FA68A] relative">
        <div
          className="flex flex-col items-center justify-center absolute bottom-0"
          style={pinStyle}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#6C7A8A]" />
          <div className="w-[2px] h-4 bg-[#6C7A8A]" />
        </div>
      </div>
    </div>
  );
}

export { GradientLine };
