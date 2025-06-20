import CocaColaImg from "../../assets/coca-cola-png.png";

function Hero() {
  return (
    <section className="py-6 px-2 max-w-2xl mx-auto">
      <article className="py-4 px-2 grid grid-cols-2 items-center justify-items-center bg-gradient-to-br from-sky-200 to-pink-200 rounded-2xl">
        <figure className="w-32">
          <img
            className="w-full object-cover"
            src={CocaColaImg}
            alt="Botella de Coca Cola"
          />
        </figure>
        <h1 className="text-4xl font-extrabold">Ofertas de la semana</h1>
      </article>
    </section>
  );
}

export default Hero;
