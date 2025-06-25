import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import LogoKramer from "../../assets/logo-kramer.png";

function Header() {
  return (
    <header className="header p-4 py-2 md:px-10 text-lg font-semibold shadow-2xl">
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        <Link to="/" className="flex items-center gap-2 z-10" title="Inicio">
          <img
            className="max-w-18 object-cover"
            src={LogoKramer}
            alt=""
            width={600}
            height={279}
          />
        </Link>
        <button className="cursor-pointer">
          <ShoppingCart />
        </button>
      </div>
    </header>
  );
}

export default Header;
