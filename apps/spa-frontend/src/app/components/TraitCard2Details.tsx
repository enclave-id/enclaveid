import { useLocation } from 'react-router-dom';
import { TraitCard2Props } from './TraitCard2';

function TraitCard2Details() {
  const location = useLocation();
  const { data } = location.state as TraitCard2Props;
  return <div>TraitCard2Details</div>;
}

export { TraitCard2Details };
