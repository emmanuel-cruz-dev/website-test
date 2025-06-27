import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import Loading from "./components/Loading";

const Home = lazy(() => import("./routes/Home"));
const SnacksPage = lazy(() => import("./routes/SnacksPage"));
const DrinksPage = lazy(() => import("./routes/DrinksPage"));
const CleaningPage = lazy(() => import("./routes/CleaningPage"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snacks" element={<SnacksPage />} />
          <Route path="/bebidas" element={<DrinksPage />} />
          <Route path="/limpieza" element={<CleaningPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
