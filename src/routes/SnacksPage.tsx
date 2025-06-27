import { Suspense } from "react";
import Loading from "../components/Loading";
import CategoryBanner from "../components/CategoryBanner";
import SnacksBanner from "../assets/snacks-banner.png";

const SnacksPage = () => (
  <Suspense fallback={<Loading />}>
    <CategoryBanner title="Snacks" image={SnacksBanner} />
  </Suspense>
);

export default SnacksPage;
