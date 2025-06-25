import { ProductCardProps } from "@/types/types";
import { ShoppingCart } from "lucide-react";

function ProductCard({ image, name, price, description }: ProductCardProps) {
  return (
    <article className="cursor-grab">
      <div className="bg-[#d2eafc] rounded-2xl mb-2 p-8">
        <img
          className="max-w-10/12 object-cover mx-auto drop-shadow-xl"
          src={image}
          alt={description}
          width={500}
          height={500}
          loading="lazy"
        />
      </div>
      <footer className="font-medium flex flex-col gap-2">
        <h2 className="text-xl">{name}</h2>
        <p className="text-2xl">${price}</p>
        <button className="flex text-xl gap-2 justify-center items-center py-3 bg-[#8de68a] hover:bg-[#7ace77] transition-colors duration-300 ease-in-out rounded-full cursor-pointer">
          <ShoppingCart />
          Agregar
        </button>
      </footer>
    </article>
  );
}

export default ProductCard;
