import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard";
import BagleyImg from "../assets/bagley.png";
import CoflerImg from "../assets/cofler_Toffi.png";
import MinitortaImg from "../assets/miniTorta-aguila.png";
import PepsiImg from "../assets/pepsi.png";
import LaysImg from "../assets/lays.png";

function Recommended() {
  return (
    <section className="py-6">
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
          <SwiperSlide>
            <ProductCard img={BagleyImg} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard img={CoflerImg} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard img={MinitortaImg} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard img={PepsiImg} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard img={LaysImg} />
          </SwiperSlide>
        </Swiper>
      </main>
    </section>
  );
}

export default Recommended;
