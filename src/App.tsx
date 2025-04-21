import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Loading from "./components/Loading/Loading";
import Register from "./pages/Register/Register";
import Schedule from "./pages/Schedule/Schedule";
import Professionals from "./pages/OurServices/Professionals/Professionals";

const Contact = lazy(() => import("./pages/Contact/Contact/Contact"));
const Hero = lazy(() => import("./pages/Home/Hero/Hero"));
const AboutUs = lazy(() => import("./pages/About/AboutUs/AboutUs"));
const OurServices = lazy(
  () => import("./pages/OurServices/OurServices/OurServices")
);
const Login = lazy(() => import("./pages/Login/Login/Login"));

const Home = () => (
  <Suspense fallback={<Loading />}>
    <Hero />
  </Suspense>
);

const About = () => (
  <Suspense fallback={<Loading />}>
    <AboutUs />
  </Suspense>
);

const SchedulePage = () => (
  <Suspense fallback={<Loading />}>
    <Schedule />
  </Suspense>
);

const Services = () => (
  <Suspense fallback={<Loading />}>
    <Professionals />
    <OurServices />
  </Suspense>
);

const ContactPage = () => (
  <Suspense fallback={<Loading />}>
    <Contact />
  </Suspense>
);

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default App;
