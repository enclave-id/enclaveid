import { useLocation } from 'react-router-dom';
import { SixteenPFCardProps } from './SixteenPFCard';

function SixteenPFCardDetails() {
  const location = useLocation();
  const { data } = location.state as SixteenPFCardProps;
  return <div>SixteenPFCardDetails</div>;
}

export { SixteenPFCardDetails };
