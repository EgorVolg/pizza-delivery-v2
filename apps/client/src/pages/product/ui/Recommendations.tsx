import { ProductCard } from "../../../entities/homepage/ProductCard/ProductCard";
import type { PizzaCard } from "../../../entities/products/model/pizza.types";
import { useGetAllProductsQuery } from "../../../entities/products/model/products.api";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import styles from "./Recommendations.module.css";
import { Autoplay, FreeMode, Grid, Navigation } from "swiper/modules";
import { useEffect, useState, useRef } from "react";

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

export const Recommendations = ({ product }: { product: PizzaCard }) => {
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<SwiperRef | null>(null);
  const { data } = useGetAllProductsQuery();

  if (!data) return null;
  const recommendations = data
    .filter((pr) => product.category_id === pr.category_id)
    .filter((pr) =>
      pr.ingredients || pr.ingredients !== null
        ? pr.ingredients.some((ing) => product.ingredients.includes(ing))
        : pr
    );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 769);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className={styles.title_container}>
        <h3 className={styles.title}>Рекомендации</h3>

        <div
          className={styles.buttons_group}
          style={isMobile ? { display: "none" } : {}}
        >
          <button className={`${styles.navButton} ${styles.prev} custom-prev`}>
            <svg viewBox="0 0 24 24">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className={`${styles.navButton} ${styles.next} custom-next`}>
            <svg viewBox="0 0 24 24">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

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
        {recommendations.map((pizza, index) => (
          <SwiperSlide>
            <ProductCard
              pizza={pizza}
              className={styles.card}
              key={String(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={styles.buttons_group}
        style={!isMobile ? { display: "none" } : {}}
      >
        <button className={`${styles.navButton} ${styles.prev} custom-prev`}>
          <svg viewBox="0 0 24 24">
            <path
              d="M15 6l-6 6 6 6"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button className={`${styles.navButton} ${styles.next} custom-next`}>
          <svg viewBox="0 0 24 24">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
