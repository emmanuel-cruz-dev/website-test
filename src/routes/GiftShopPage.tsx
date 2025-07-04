import { Suspense } from "react";
import Loading from "../components/Loading";
import CategoryBanner from "../components/CategoryBanner";
import RegaleriaBanner from "../assets/regaleria-banner.png";

const GiftShopPage = () => (
  <Suspense fallback={<Loading />}>
    <CategoryBanner title="Regalería" image={RegaleriaBanner} />
  </Suspense>
);

export default GiftShopPage;
