import { Suspense } from "react";
import Loading from "../components/Loading";
import SearchModal from "../components/SearchModal";
import CategoryNavigation from "../pages/Home/CategoryNavigation";
import Recommended from "../pages/Home/Recommended";
import TwoForOneBanner from "../components/TwoForOneBanner";
import HeroSlider from "../pages/Home/HeroSlider";

const Home = () => (
  <Suspense fallback={<Loading />}>
    <HeroSlider />
    <SearchModal />
    <CategoryNavigation />
    <Recommended />
    <TwoForOneBanner />
  </Suspense>
);

export default Home;
