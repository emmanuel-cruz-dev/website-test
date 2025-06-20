import SliderCard from "./SliderCard";

function SliderProducts() {
  return (
    <section className="lg:py-6 px-2 max-w-2xl mx-auto">
      <article className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-16 items-center">
        <SliderCard />
        <SliderCard />
        <SliderCard />
      </article>
    </section>
  );
}

export default SliderProducts;
