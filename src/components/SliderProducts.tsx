import SliderCard from "./SliderCard";
import SnacksImg from "../assets/snacks-icon.png";
import LimpiezaImg from "../assets/limpieza-icon.png";
import LacteosImg from "../assets/bebidas-icon.png";

function SliderProducts() {
  return (
    <section className="lg:py-6 px-4 max-w-2xl mx-auto pb-6">
      <article className="grid grid-cols-3 gap-10 md:gap-8 lg:gap-16 items-center">
        <SliderCard image={SnacksImg} title="Snacks" />
        <SliderCard image={LacteosImg} title="Bebidas" />
        <SliderCard image={LimpiezaImg} title="Limpieza" />
      </article>
    </section>
  );
}

export default SliderProducts;
