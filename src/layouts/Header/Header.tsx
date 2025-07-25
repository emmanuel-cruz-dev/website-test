import { Link } from "react-router-dom";
import { BadgePercent } from "lucide-react";
import LogoKramer from "../../assets/logo-kramer.avif";

function Header() {
  return (
    <header className="header p-4 py-2 md:px-10 text-lg font-semibold">
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        <Link to="/" className="flex items-center gap-2 z-10" title="Inicio">
          <img
            className="max-w-22 object-cover"
            src={LogoKramer}
            alt=""
            width={600}
            height={279}
          />
        </Link>
        <button
          className="flex flex-col items-center cursor-pointer"
          title="Ver promociones"
        >
          <BadgePercent size={18} />
          <span className="text-xs">Promos</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
