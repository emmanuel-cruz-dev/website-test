import { Suspense } from "react";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import SearchModal from "../components/SearchModal";
import CategoryNavigation from "../pages/Home/CategoryNavigation";
import Recommended from "../pages/Home/Recommended";
import TwoForOneBanner from "../components/TwoForOneBanner";

const Home = () => (
  <Suspense fallback={<Loading />}>
    <Hero />
    <SearchModal />
    <CategoryNavigation />
    <Recommended />
    <TwoForOneBanner />
  </Suspense>
);

export default Home;
