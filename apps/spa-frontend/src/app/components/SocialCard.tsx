import { Link } from 'react-router-dom';
import { LocationPinIcon } from './Icons';
import { toSvg } from 'jdenticon';

type User = {
  name: string;
  gender: string;
  location: string;
  type: string;
  image: string;
};

function getIdenticon(uniqueId: string): string {
  const svgString = toSvg(uniqueId, 200);

  return (
    'data:image/svg+xml,' +
    encodeURIComponent(svgString).replace(/'/g, '%27').replace(/"/g, '%22')
  );
}

function SocialCard({ name, gender, location }: User) {
  const formattedLink = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('-');
  };
  return (
    <Link
      to={`/socials/${formattedLink(name)}`}
      state={{ name, gender, location }}
      className="p-6 flex items-center gap-4 border border-[#E5E8EE] rounded-3xl"
    >
      <img
        src={getIdenticon(name)}
        alt=""
        className="w-[101px] h-[101px] rounded-full"
      />
      <div className="flex flex-col">
        <h4 className="text-passiveLinkColor font-medium text-2xl leading-7">
          {name}
        </h4>
        <h5 className="text-passiveLinkColor font-medium leading-[18px] mt-[9px]">
          {gender}
        </h5>
        <div className="flex items-center gap-2 mt-3">
          <LocationPinIcon />
          <h6 className="text-passiveLinkColor font-medium leading-[18px]">
            {location}
          </h6>
        </div>
      </div>
    </Link>
  );
}

export { SocialCard };
