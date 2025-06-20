import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  img: string;
}

function ProductCard({ img }: ProductCardProps) {
  return (
    <article>
      <figure className="max-w-20">
        <img src={img} alt="" />
      </figure>
      <footer>
        <h2>Papas Lays</h2>
        <p>$2.99</p>
        <button className="flex gap-2 items-center">
          <ShoppingCart />
          Agregar
        </button>
      </footer>
    </article>
  );
}

export default ProductCard;
