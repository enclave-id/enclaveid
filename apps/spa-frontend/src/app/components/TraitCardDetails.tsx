import { useLocation } from "react-router-dom";
import { TraitCardProps } from "./TraitCard1";
import { TraitCard } from "./TraitCard";


function TraitCardDetails () {
  const location = useLocation();
  const { data } = location.state as TraitCardProps;
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-[22px] flex-wrap">
        {data.map((item, index) => {
          return <TraitCard {...item} key={index} />;
        })}
      </div>
    </div>
  );
};

export  {TraitCardDetails};
