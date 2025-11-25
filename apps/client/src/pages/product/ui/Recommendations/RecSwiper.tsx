import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Recommendations.module.css";
import { ProductCard } from "../../../../entities/homepage/ProductCard/ProductCard";
import { Autoplay, FreeMode, Grid, Navigation } from "swiper/modules";
import type { PizzaResponse } from "../../../../entities/products/model/pizza.types";

const swiperBreakpoints = {
  1161: {
    slidesPerView: 4,
    spaceBetween: 50,
  },

  1025: {
    slidesPerView: 3,
    spaceBetween: 50,
  },

  769: {
    slidesPerView: 1,
    grid: { rows: 2 },
  },

  481: {
    slidesPerView: 1,
    spaceBetween: 20,
  },

  0: {
    slidesPerView: 1,
    spaceBetween: 50,
  },
};

export const RecSwiper = ({ recommendations, isMobile, swiperRef }: any) => {
  return (
    <Swiper
      ref={swiperRef}
      modules={[FreeMode, Grid, Navigation, Autoplay]}
      freeMode={true}
      grabCursor={true}
      spaceBetween={25}
      breakpoints={swiperBreakpoints}
      navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next",
      }}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      slidesPerGroup={!isMobile ? 4 : 1}
      speed={800}
    >
      {recommendations.map((pizza: PizzaResponse, index: number) => (
        <SwiperSlide>
          <ProductCard
            pizza={pizza}
            className={styles.card}
            key={String(index)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
