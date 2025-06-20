import SliderCard from "./SliderCard";
import SnacksImg from "../assets/snacks.png";
import LimpiezaImg from "../assets/limpieza.png";
import LacteosImg from "../assets/lacteos.png";

function SliderProducts() {
  return (
    <section className="lg:py-6 px-2 max-w-2xl mx-auto pb-6">
      <article className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-16 items-center">
        <SliderCard image={SnacksImg} title="Snacks" />
        <SliderCard image={LacteosImg} title="Lácteos" />
        <SliderCard image={LimpiezaImg} title="Limpieza" />
      </article>
    </section>
  );
}

export default SliderProducts;
