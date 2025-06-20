import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import Loading from "./components/Loading";
import Hero from "./pages/Home/Hero";
import SliderProducts from "./components/SliderProducts";
import Recommended from "./components/Recommended";

const Home = () => (
  <Suspense fallback={<Loading />}>
    <Hero />
    <SliderProducts />
    <Recommended />
  </Suspense>
);

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
