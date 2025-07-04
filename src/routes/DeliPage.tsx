import { Suspense } from "react";
import Loading from "../components/Loading";
import CategoryBanner from "../components/CategoryBanner";
import FiambreriaBanner from "../assets/fiambreria-banner.avif";

const DeliPage = () => (
  <Suspense fallback={<Loading />}>
    <CategoryBanner title="Fiambrería" image={FiambreriaBanner} />
  </Suspense>
);

export default DeliPage;
