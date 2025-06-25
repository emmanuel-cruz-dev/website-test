import { House, Search, ShoppingCart } from "lucide-react";

function Footer() {
  return (
    <footer className="footer p-4 pb-2 max-w-2xl mx-auto" id="footer">
      <ul
        className="flex justify-between items-center bg-white rounded-2xl p-4 px-10"
        style={{
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
        }}
      >
        <li>
          <a href="#">
            <House />
          </a>
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
    </footer>
  );
}

export default Footer;
