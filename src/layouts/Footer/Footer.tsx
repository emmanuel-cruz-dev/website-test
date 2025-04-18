import LogoIcon from "../../assets/aura-icon.png";
import { FaPhone, FaEnvelope, FaMapMarker, FaGithub } from "react-icons/fa";
import "./Footer.css";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer bg-[#3d8cc7] text-white" id="footer">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-9 gap-y-6 gap-2 xl:gap-6 py-20 border-b border-neutral-300 px-6 sm:px-8 lg:px-10">
        <article className="xl:col-span-3 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              className="max-w-12"
              src={LogoIcon}
              alt="Logo de LockKey, un candado con una cabeza de serpiente."
              width={200}
              height={200}
              loading="lazy"
            />
            <h2 className="font-semibold text-3xl">AURA</h2>
          </div>
          <p className="mb-3 text-neutral-100">
            Sistema integral para la gestión eficiente de turnos, historiales
            clínicos y atenciones en centros de salud multiespecialidad.
          </p>
          <SocialIcons borderRadius={false} />
        </article>
        <article className="xl:col-span-2">
          <h2 className="footer__title">Navegación</h2>
          <ul className="footer__list footer__navbar">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/about">Sobre Nosotros</Link>
            </li>
            <li>
              <Link to="/services">Servicios</Link>
            </li>
            <li>
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
        </article>
        <article className="xl:col-span-2">
          <h2 className="footer__title">Datos de Contacto</h2>
          <ul className="footer__list [&>li]:flex [&>li]:gap-3 [&>li]:items-center">
            <li>
              <FaPhone />
              <a href="#">+61 3 8376 6284</a>
            </li>
            <li>
              <FaEnvelope />
              <a href="#">aura@info.com</a>
            </li>
            <li>
              <FaMapMarker />
              <a href="#">Adolfo Alsina 451, CABA</a>
            </li>
          </ul>
        </article>
        <article className="xl:col-span-2">
          <h2 className="footer__title">Newsletter</h2>
          <form className="flex flex-col gap-4" action="">
            <input
              className="p-4 rounded-md text-black"
              name="email"
              id="email"
              type="email"
              placeholder="Correo electrónico"
              autoComplete="email"
              required
            />
            <button
              className="btn__primary bg-white border-transparent text-black"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </article>
      </section>
      <article className="flex justify-between items-center p-6 py-8 md:px-10">
        <a
          href="https://github.com/AuraFTG"
          target="_blank"
          rel="noopener noreferrer"
          title="Repositorio de GitHub"
        >
          <FaGithub className="text-3xl hover:scale-110 transition-transform duration-300" />
        </a>
        <p className="text-neutral-100 text-center w-2/3 md:w-auto">
          Aura copyright © 2025. Todos los derechos reservados.
        </p>
        <span></span>
      </article>
    </footer>
  );
}

export default Footer;
