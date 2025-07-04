import { Suspense } from "react";
import Loading from "../components/Loading";
import CategoryBanner from "../components/CategoryBanner";
import LibreriaBanner from "../assets/libreria-banner.png";

const BookStorePage = () => (
  <Suspense fallback={<Loading />}>
    <CategoryBanner title="Librería" image={LibreriaBanner} />
  </Suspense>
);

export default BookStorePage;
