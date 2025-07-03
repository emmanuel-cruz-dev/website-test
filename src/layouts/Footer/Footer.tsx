import { House, Search, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  return (
    <>
      <footer
        className="fixed bottom-0 z-10 footer p-4 pb-2 max-w-2xl mx-auto w-full"
        id="footer"
      >
        <nav className="p-[5px] rounded-2xl bg-gradient-to-r from-[#dff3fd] via-[#f5f6f6] to-[#fdf1ea]">
          <ul className="flex justify-between items-center bg-white rounded-xl pt-1 px-10">
            <li>
              <Link
                to="/"
                title="Inicio"
                className={`inline-block p-2 rounded-lg transition-colors duration-300 border-2 ${
                  location.pathname === "/"
                    ? "border-black"
                    : "border-transparent hover:bg-gray-100"
                }`}
              >
                <House size={22} />
              </Link>
            </li>
            <li>
              <Link
                to="/busqueda"
                title="Buscar"
                className={`inline-block p-2 rounded-lg transition-colors duration-300 border-2 ${
                  location.pathname === "/busqueda"
                    ? "border-black"
                    : "border-transparent hover:bg-gray-100"
                }`}
              >
                <Search size={22} />
              </Link>
            </li>
            <li>
              <Link
                to="/carrito"
                title="Carrito"
                className={`inline-block p-3 rounded-lg transition-colors duration-300 border-2 ${
                  location.pathname === "/carrito"
                    ? "border-black"
                    : "border-transparent hover:bg-gray-100"
                }`}
              >
                <ShoppingCart size={22} />
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
      <div className="h-16"></div>
    </>
  );
}

export default Footer;
