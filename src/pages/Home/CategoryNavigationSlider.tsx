import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import NavigationCard from "./NavigationCard";
import SnacksImg from "../../assets/snacks-icon.png";
import LacteosImg from "../../assets/bebidas-icon.png";
import LimpiezaImg from "../../assets/limpieza-icon.png";
import AlmacenImg from "../../assets/almacen-icon.png";
import PanaderiaImg from "../../assets/panaderia-icon.png";
import FiambreriaImg from "../../assets/fiambreria-icon.png";
import LibreriaImg from "../../assets/libreria-icon.png";
import RegaleriaImg from "../../assets/regaleria-icon.png";

function CategoryNavigationSlider() {
  return (
    <section className="lg:py-6 px-4 max-w-2xl mx-auto pb-6">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <NavigationCard image={SnacksImg} title="Snacks" link="/snacks" />
        </SwiperSlide>
        <SwiperSlide>
          <NavigationCard image={LacteosImg} title="Bebidas" link="/bebidas" />
        </SwiperSlide>
        <SwiperSlide>
          <NavigationCard
            image={LimpiezaImg}
            title="Limpieza"
            link="/limpieza"
          />
        </SwiperSlide>
        <SwiperSlide>
          <NavigationCard image={AlmacenImg} title="Almacén" link="/almacen" />
        </SwiperSlide>
        <SwiperSlide>
          <NavigationCard
            image={PanaderiaImg}
            title="Panadería"
            link="/panaderia"
          />
        </SwiperSlide>
        <SwiperSlide>
          <NavigationCard
            image={FiambreriaImg}
            title="Fiambrería"
            link="/fiambreria"
          />
        </SwiperSlide>
        <SwiperSlide>
          <NavigationCard
            image={LibreriaImg}
            title="Librería"
            link="/libreria"
          />
        </SwiperSlide>
        <SwiperSlide>
          <NavigationCard
            image={RegaleriaImg}
            title="Regalería"
            link="/regaleria"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default CategoryNavigationSlider;
