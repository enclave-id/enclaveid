interface CompassChartProps {
  x: number;
  y: number;
}

function CompassChart({ x, y }: CompassChartProps) {
  const unitToPixels = 264 / 10;

  const centerX = 132;
  const centerY = 132;

  const posX = centerX + x * unitToPixels;
  const posY = centerY - y * unitToPixels;

  return (
    <div className="max-w-max relative">
      <div className="grid grid-cols-2 max-h-max">
        <div className="w-[132px] h-[132px] border border-[#AFB5BC] bg-[#FFE5E5] relative">
          <span className="absolute -bottom-px right-1 text-[#7A818A] text-sm leading-[14px] uppercase">
            Economic
          </span>
        </div>
        <div className="w-[132px] h-[132px] border border-[#AFB5BC] border-l-0 bg-[#E5F1FF] relative">
          <span className="absolute top-px left-[2px] text-[#7A818A] text-sm leading-4">
            +5
          </span>
        </div>
        <div className="w-[132px] h-[132px] border border-[#AFB5BC] border-t-0 bg-[#E5FFEE] relative">
          <span className="absolute top-px left-[2px] text-[#7A818A] text-sm leading-4">
            -5
          </span>
        </div>
        <div className="w-[132px] h-[132px] border border-[#AFB5BC] border-t-0 border-l-0 bg-[#F7E5FF] relative">
          <span className="absolute top-px right-[2px] text-[#7A818A] text-sm leading-4">
            +5
          </span>
          <span className="absolute bottom-px left-[2px] text-[#7A818A] text-sm leading-4">
            -5
          </span>
          <span className="absolute top-1 left-[2px] text-rotation text-[#7A818A] text-sm leading-[14px] uppercase">
            Social
          </span>
        </div>
      </div>
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[#7A818A] text-sm leading-[14px]">
        Authoritarian
      </span>
      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[#7A818A] text-sm leading-[14px]">
        Libertarian
      </span>
      <span className="absolute top-1/2 -left-8 -translate-y-1/2 text-[#7A818A] text-sm leading-[14px]">
        Left
      </span>
      <span className="absolute top-1/2 -right-9 -translate-y-1/2 text-[#7A818A] text-sm leading-[14px]">
        Right
      </span>
      <div
        className="absolute bg-[#6C7A8A] rounded-full w-4 h-4"
        style={{
          left: `${posX}px`,
          top: `${posY}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}

export default CompassChart;
