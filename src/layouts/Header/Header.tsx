import KramerIcon from "../../assets/kisco-kramer-icon.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header p-4 md:px-10 md:py-5 text-lg font-semibold shadow-2xl">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-10" title="Inicio">
          <img
            className="max-w-10 object-cover"
            src={KramerIcon}
            alt=""
            width={200}
            height={200}
          />
          <p className="font-semibold">Kiosco Kramer</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
