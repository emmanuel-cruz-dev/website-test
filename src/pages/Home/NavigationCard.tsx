import { Link } from "react-router-dom";
import { NavigationCardProps } from "../../types/types";

function NavigationCard({ image, title, link }: NavigationCardProps) {
  return (
    <Link to={link} className="block bg-[#d2eafc] rounded-2xl py-3">
      <figure className="max-w-16 md:max-w-24 mx-auto my-2 md:mb-4">
        <img
          className="w-full object-cover drop-shadow-lg"
          src={image}
          alt={`Icono ${title}`}
          width={600}
          height={600}
          loading="lazy"
        />
      </figure>
      <h1 className="md:text-2xl font-semibold text-center">{title}</h1>
    </Link>
  );
}

export default NavigationCard;
