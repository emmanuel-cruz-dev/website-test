import CocaColaImg from "../../assets/coca-cola.png";

function Hero() {
  return (
    <section className="py-6 px-4 max-w-2xl mx-auto">
      <article className="py-4 px-2 grid grid-cols-2 gap-2 items-center justify-items-center bg-gradient-to-b from-[#dff3fd] via-[#f5f6f6] to-[#fdf1ea] rounded-2xl">
        <figure className="w-52">
          <img
            className="w-full object-cover"
            src={CocaColaImg}
            alt="Botella de Coca Cola"
            width={550}
            height={550}
            loading="lazy"
          />
        </figure>
        <h1 className="text-3xl font-extrabold w-10/12">
          Ofertas de la semana
        </h1>
      </article>
    </section>
  );
}

export default Hero;
