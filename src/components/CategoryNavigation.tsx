import NavigationCard from "./NavigationCard";
import SnacksImg from "../assets/snacks-icon.png";
import LimpiezaImg from "../assets/limpieza-icon.png";
import LacteosImg from "../assets/bebidas-icon.png";

function CategoryNavigation() {
  return (
    <section className="lg:py-6 px-4 max-w-2xl mx-auto pb-6">
      <article className="grid grid-cols-3 gap-10 md:gap-8 lg:gap-16 items-center">
        <NavigationCard image={SnacksImg} title="Snacks" link="/snacks" />
        <NavigationCard image={LacteosImg} title="Bebidas" link="/bebidas" />
        <NavigationCard image={LimpiezaImg} title="Limpieza" link="/limpieza" />
      </article>
    </section>
  );
}

export default CategoryNavigation;
