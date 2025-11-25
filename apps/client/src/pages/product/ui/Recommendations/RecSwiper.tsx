import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Recommendations.module.css";
import { ProductCard } from "../../../../entities/homepage/ProductCard/ProductCard";
import { Autoplay, FreeMode, Grid, Navigation } from "swiper/modules";
import type { PizzaResponse } from "../../../../entities/products/model/pizza.types";
import { useEffect, useState } from "react";

const swiperBreakpoints = {
  1161: {
    slidesPerView: 4,
    spaceBetween: 50,
  },

  1025: {
    slidesPerView: 4,
    spaceBetween: 25,
  },

  1024: {
    slidesPerView: 1,
    grid: { rows: 2 },
  },

  768: {
    slidesPerView: 1,
    spaceBetween: 20,
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

export const RecSwiper = ({
  recommendations,
}: {
  recommendations: PizzaResponse[];
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Swiper
      key={recommendations.length}
      modules={[FreeMode, Grid, Navigation, Autoplay]}
      freeMode={true}
      grabCursor={true}
      spaceBetween={25}
      breakpoints={swiperBreakpoints}
      navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next",
      }}
      loop={recommendations.length > 1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      slidesPerGroup={!isMobile ? 4 : 1} // Количество слайдов в группе
      speed={800}
    >
      {recommendations.map((pizza: PizzaResponse, index: number) => (
        <SwiperSlide key={index}>
          <ProductCard pizza={pizza} className={styles.card} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
