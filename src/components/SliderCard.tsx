interface SliderCardProps {
  title: string;
  image: string;
}

function SliderCard({ image, title }: SliderCardProps) {
  return (
    <a href="#" className="bg-[#f6c06e] rounded-2xl py-3">
      <figure className="max-w-16 md:max-w-24 mx-auto mb-2 md:mb-4">
        <img
          className="w-full object-cover"
          src={image}
          alt={`Icono ${title}`}
        />
      </figure>
      <h1 className="md:text-2xl font-bold text-center">{title}</h1>
    </a>
  );
}

export default SliderCard;
