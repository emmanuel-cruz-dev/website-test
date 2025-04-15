import HeroBanner from "../../../assets/hero-banner.png";
import CircleImg from "../../../assets/circle-background-img.avif";
import GradientImg from "../../../assets/gradient-background-img.avif";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <main
      className="hero relative container grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 py-4 sm:py-12 md:py-0"
      id="hero"
    >
      <section className="order-2 md:order-1">
        <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold mb-6">
          Bienvenido a <span className="text__primary-dark">AURA</span>, tu
          solución para la{" "}
          <span className="text__primary-dark">gestión clínica</span>
        </h1>
        <p className="text-xl font-[400] leading-[33px] mb-6">
          Administra turnos, registra pacientes y accede al historial clínico de
          manera rápida y eficiente. Simplifica la gestión de tu centro de salud
          con nuestra plataforma unificada.
        </p>
        <div className="flex gap-4 mb-5">
          <Link to="/login" className="btn__primary btn__lime text-white">
            Empieza Hoy
          </Link>
          <Link to="/contact" className="btn__primary">
            Contáctanos
          </Link>
        </div>
        <p className="text-sm text-neutral-600">
          Accedé a la versión de prueba sin compromiso. Mejorá tu gestión médica
          desde hoy.
        </p>
      </section>
      <figure className="order-1 md:order-2 w-2/3 md:w-96 xl:w-[38rem] mx-auto md:mr-0">
        <img
          className="w-full object-cover mask-bottom-fade"
          src={HeroBanner}
          alt="Icono de una pantalla con un escudo delante, el escudo tiene un simbolo de check en el centro."
          width={601}
          height={565}
        />
      </figure>
      <img
        className="absolute z-[-1] w-72 -top-40 -left-56 opacity-10 transform rotate-180"
        src={CircleImg}
        alt="Línea circular formando un anillo."
        width={445}
        height={405}
      />
      <img
        className="hidden lg:block absolute z-[-1] -right-96 opacity-60"
        src={GradientImg}
        alt="Fondo gradiente de puntos formando ondulaciones."
        width={1689}
        height={1263}
      />
    </main>
  );
}

export default Hero;
