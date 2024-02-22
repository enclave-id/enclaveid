import { useElementWidth } from '../hooks/useElementWidth';

const MAX_COMPASS_VALUE = 5;

interface CompassChartProps {
  x: number;
  y: number;
}

function CompassChart({ x, y }: CompassChartProps) {
  const [compassRef, compassWidth] = useElementWidth();

  const unitToPixels = compassWidth / 10;

  const posX = compassWidth / 2 + x * unitToPixels;
  const posY = compassWidth / 2 - y * unitToPixels;

  let label = 'Unaligned';
  if (y > 0) {
    label = 'Authoritarian';
  } else if (y < 0) {
    label = 'Libertarian';
  }

  if (x > 0) {
    label += ' Right';
  } else if (x < 0) {
    label += ' Left';
  } else {
    label += ' Center';
  }

  return (
    <div className="flex flex-col gap-11">
      <h2 className="text-[#6D4190] text-xl leading-6">
        {label}{' '}
        <span className="text-[#6C7A8A]">
          ({x > 0 ? '+' : ''}
          {x};{y > 0 ? '+' : ''}
          {y})
        </span>
      </h2>
      <div
        ref={compassRef as React.RefObject<HTMLDivElement>}
        className="max-w-max relative"
      >
        <div className="grid grid-cols-2 max-h-max">
          <div className="w-[132px] h-[132px] border border-[#AFB5BC] bg-[#FFE5E5] relative">
            <span className="absolute -bottom-px right-1 text-[#7A818A] text-sm leading-[14px] uppercase">
              Economic
            </span>
          </div>
          <div className="w-[132px] h-[132px] border border-[#AFB5BC] border-l-0 bg-[#E5F1FF] relative">
            <span className="absolute top-px left-[2px] text-[#7A818A] text-sm leading-4">
              +{MAX_COMPASS_VALUE}
            </span>
          </div>
          <div className="w-[132px] h-[132px] border border-[#AFB5BC] border-t-0 bg-[#E5FFEE] relative">
            <span className="absolute top-px left-[2px] text-[#7A818A] text-sm leading-4">
              -{MAX_COMPASS_VALUE}
            </span>
          </div>
          <div className="w-[132px] h-[132px] border border-[#AFB5BC] border-t-0 border-l-0 bg-[#F7E5FF] relative">
            <span className="absolute top-px right-[2px] text-[#7A818A] text-sm leading-4">
              +{MAX_COMPASS_VALUE}
            </span>
            <span className="absolute bottom-px left-[2px] text-[#7A818A] text-sm leading-4">
              -{MAX_COMPASS_VALUE}
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
    </div>
  );
}

export default CompassChart;
