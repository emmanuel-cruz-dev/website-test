import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import TwoForOneBanner from "../../components/TwoForOneBanner";
import Hero from "../../components/Hero";

function HeroSlider() {
  return (
    <section>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
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
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <TwoForOneBanner />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default HeroSlider;
