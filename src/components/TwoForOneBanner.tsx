import GalletitasImg from "../assets/galletitas.png";

function TwoForOneBanner() {
  return (
    <section className="py-6 px-4 max-w-2xl mx-auto">
      <article className="py-4 px-2 grid grid-cols-2 gap-2 justify-items-center bg-gradient-to-b from-[#dff3fd] via-[#f5f6f6] to-[#fdf1ea] rounded-2xl">
        <h1 className="text-4xl font-bold w-10/12">¡2x1 en Galletitas!</h1>
        <figure className="w-52">
          <img
            className="w-full object-cover"
            src={GalletitasImg}
            alt="Botella de Coca Cola"
            width={550}
            height={550}
            loading="lazy"
          />
        </figure>
      </article>
    </section>
  );
}

export default TwoForOneBanner;
