import { House, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer p-4 pb-2 max-w-2xl mx-auto" id="footer">
      <article className="p-[5px] rounded-2xl bg-gradient-to-r from-[#dff3fd] via-[#f5f6f6] to-[#fdf1ea]">
        <ul className="flex justify-between items-center bg-white rounded-xl p-4 px-10">
          <li>
            <Link to="/" title="Inicio">
              <House />
            </Link>
          </li>
          <li>
            <a href="#">
              <Search />
            </a>
          </li>
          <li>
            <a href="#">
              <ShoppingCart />
            </a>
          </li>
        </ul>
      </article>
    </footer>
  );
}

export default Footer;
