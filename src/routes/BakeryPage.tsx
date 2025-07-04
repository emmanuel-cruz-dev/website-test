import { Suspense } from "react";
import Loading from "../components/Loading";
import CategoryBanner from "../components/CategoryBanner";
import PanaderiaBanner from "../assets/panaderia-banner.png";

const BakeryPage = () => (
  <Suspense fallback={<Loading />}>
    <CategoryBanner title="Panadería" image={PanaderiaBanner} />
  </Suspense>
);

export default BakeryPage;
