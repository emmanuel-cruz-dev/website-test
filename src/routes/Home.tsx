import { Suspense } from "react";
import Loading from "../components/Loading";
import Hero from "../pages/Home/Hero";
import SearchModal from "../components/SearchModal";
import CategoryNavigation from "../components/CategoryNavigation";
import Recommended from "../components/Recommended";
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
