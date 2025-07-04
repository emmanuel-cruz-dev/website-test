import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import TwoForOneBanner from "../../components/TwoForOneBanner";
import Hero from "../../components/Hero";
import CategoryBanner from "../../components/CategoryBanner";
import BebidasBanner from "../../assets/bebidas-banner.avif";
import LimpiezaBanner from "../../assets/limpieza-banner.avif";
import SnacksBanner from "../../assets/snacks-banner.avif";

function HeroSlider() {
  return (
    <section>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <TwoForOneBanner />
        </SwiperSlide>
        <SwiperSlide>
          <CategoryBanner title="Bebidas" image={BebidasBanner} />
        </SwiperSlide>
        <SwiperSlide>
          <CategoryBanner title="Limpieza" image={LimpiezaBanner} />
        </SwiperSlide>
        <SwiperSlide>
          <CategoryBanner title="Snacks" image={SnacksBanner} />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default HeroSlider;
