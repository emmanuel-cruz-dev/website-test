interface CategoryBannerProps {
  image: string;
  title: string;
}

function CategoryBanner({ image, title }: CategoryBannerProps) {
  return (
    <section className="py-6 px-4 max-w-2xl mx-auto">
      <article className="py-4 px-2 flex gap-6 items-center justify-center bg-gradient-to-b from-[#dff3fd] via-[#f5f6f6] to-[#fdf1ea] rounded-2xl">
        <figure className="w-52">
          <img
            className="w-full object-cover"
            src={image}
            alt={`Imagen alusiva a la categoría ${title}`}
            width={500}
            height={500}
            loading="lazy"
          />
        </figure>
        <h1 className="text-4xl font-extrabold">{title}</h1>
      </article>
    </section>
  );
}

export default CategoryBanner;
