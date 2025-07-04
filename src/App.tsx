import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import Loading from "./components/Loading";

const Home = lazy(() => import("./routes/Home"));
const SnacksPage = lazy(() => import("./routes/SnacksPage"));
const DrinksPage = lazy(() => import("./routes/DrinksPage"));
const CleaningPage = lazy(() => import("./routes/CleaningPage"));
const GroceryStorePage = lazy(() => import("./routes/GroceryStorePage"));
const BakeryPage = lazy(() => import("./routes/BakeryPage"));
const DeliPage = lazy(() => import("./routes/DeliPage"));
const BookStorePage = lazy(() => import("./routes/BookStorePage"));
const GiftShopPage = lazy(() => import("./routes/GiftShopPage"));
const SearchPage = lazy(() => import("./routes/SearchPage"));
const ShoppingCartPage = lazy(() => import("./routes/ShoppingCartPage"));

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
          <Route path="/almacen" element={<GroceryStorePage />} />
          <Route path="/panaderia" element={<BakeryPage />} />
          <Route path="/fiambreria" element={<DeliPage />} />
          <Route path="/libreria" element={<BookStorePage />} />
          <Route path="/regaleria" element={<GiftShopPage />} />
          <Route path="/busqueda" element={<SearchPage />} />
          <Route path="/carrito" element={<ShoppingCartPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
