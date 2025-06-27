import { Suspense } from "react";
import Loading from "../components/Loading";
import CategoryBanner from "../components/CategoryBanner";
import LimpiezaBanner from "../assets/limpieza-banner.png";

const CleaningPage = () => (
  <Suspense fallback={<Loading />}>
    <CategoryBanner title="Limpieza" image={LimpiezaBanner} />
  </Suspense>
);

export default CleaningPage;
