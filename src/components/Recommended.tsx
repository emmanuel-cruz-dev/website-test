import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

function Recommended() {
  return (
    <section className="lg:py-6 px-2 max-w-2xl mx-auto pb-6">
      <h1>Recomendados</h1>
      <main>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className=""
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </section>
  );
}

export default Recommended;
