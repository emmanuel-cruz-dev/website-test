import LogoIcon from "../../assets/aura-icon.png";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header p-4 md:px-10 md:py-5 text-[20px] font-[600] mb-8">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-10" title="Inicio">
          <img
            className="max-w-12 p-1 rounded-full"
            src={LogoIcon}
            alt="Logo de LockKey, una serpiente con un candado."
            width={200}
            height={200}
          />
          <p className="font-semibold">E-commerce</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
