import { Suspense } from "react";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import PopularSearches from "../pages/SearchPage/PopularSearches";

const SearchPage = () => (
  <Suspense fallback={<Loading />}>
    <Hero />
    <PopularSearches />
  </Suspense>
);

export default SearchPage;
