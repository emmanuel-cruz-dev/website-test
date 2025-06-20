import { ProductCardProps } from "@/types/types";
import { ShoppingCart } from "lucide-react";

function ProductCard({ image, name, price }: ProductCardProps) {
  return (
    <article className="cursor-grab">
      <figure className="bg-[#f6c06e] rounded-2xl mb-2">
        <img className="max-w-10/12 object-cover mx-auto" src={image} alt="" />
      </figure>
      <footer className="font-medium flex flex-col gap-2">
        <h2 className="text-sm">{name}</h2>
        <p>${price}</p>
        <button className="flex text-sm gap-2 justify-center items-center bg-[#8de68a] p-3 px-6 rounded-3xl cursor-pointer">
          <ShoppingCart />
          Agregar
        </button>
      </footer>
    </article>
  );
}

export default ProductCard;
