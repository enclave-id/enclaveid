import { LocationPinIcon } from './Icons';

function SocialCard() {
  return (
    <article className="p-6 flex items-center gap-4 border border-[#E5E8EE] rounded-3xl">
      <img src="./s1.png" alt="" className="w-[101px] h-[101px] rounded-full" />
      <div className="flex flex-col">
        <h4 className="text-passiveLinkColor font-medium text-2xl leading-7">
          John Doe
        </h4>
        <h5 className="text-passiveLinkColor font-medium leading-[18px] mt-[9px]">
          (he/him)
        </h5>
        <div className="flex items-center gap-2 mt-3">
          <LocationPinIcon />
          <h6 className="text-passiveLinkColor font-medium leading-[18px]">
            San Francisco
          </h6>
        </div>
      </div>
    </article>
  );
}

export { SocialCard };
