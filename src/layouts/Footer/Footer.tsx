import { House, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  // const location = useLocation();

  return (
    <footer className="footer p-4 pb-2 max-w-2xl mx-auto" id="footer">
      <article className="p-[5px] rounded-2xl bg-gradient-to-r from-[#dff3fd] via-[#f5f6f6] to-[#fdf1ea]">
        <ul className="flex justify-between items-center bg-white rounded-xl p-4 px-10">
          <li>
            <Link to="/" title="Inicio">
              <House
              // className={`w-10 h-10 p-1 rounded-lg ${
              //   location.pathname === "/" ? "border-2 border-black" : ""
              // }`}
              />
            </Link>
          </li>
          <li>
            <Link to="/busqueda" title="Buscar">
              <Search />
            </Link>
          </li>
          <li>
            <Link to="/carrito" title="Carrito">
              <ShoppingCart />
            </Link>
          </li>
        </ul>
      </article>
    </footer>
  );
}

export default Footer;
