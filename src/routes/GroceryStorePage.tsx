import { Suspense } from "react";
import Loading from "../components/Loading";
import CategoryBanner from "../components/CategoryBanner";
import AlmacenBanner from "../assets/almacen-banner.png";

const GroceryStorePage = () => (
  <Suspense fallback={<Loading />}>
    <CategoryBanner title="Almacén" image={AlmacenBanner} />
  </Suspense>
);

export default GroceryStorePage;
