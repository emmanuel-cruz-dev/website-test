import { Suspense } from "react";
import Loading from "../components/Loading";
import CategoryBanner from "../components/CategoryBanner";
import CarritoBanner from "../assets/carrito-banner.avif";

const ShoppingCartPage = () => (
  <Suspense fallback={<Loading />}>
    <CategoryBanner title="Carrito" image={CarritoBanner} />
  </Suspense>
);

export default ShoppingCartPage;
