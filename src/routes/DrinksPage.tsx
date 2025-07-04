import { Suspense } from "react";
import Loading from "../components/Loading";
import CategoryBanner from "../components/CategoryBanner";
import BebidasBanner from "../assets/bebidas-banner.avif";

const DrinksPage = () => (
  <Suspense fallback={<Loading />}>
    <CategoryBanner title="Bebidas" image={BebidasBanner} />
  </Suspense>
);

export default DrinksPage;
