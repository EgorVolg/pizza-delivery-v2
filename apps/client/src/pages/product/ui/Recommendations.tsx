import { ProductCard } from "../../../entities/homepage/ProductCard/ProductCard";
import type { PizzaCard } from "../../../entities/products/model/pizza.types";
import { useGetAllProductsQuery } from "../../../entities/products/model/products.api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./Recommendations.module.css";
import { FreeMode, Grid } from "swiper/modules";

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
  const { data } = useGetAllProductsQuery();

  if (!data) return null;
  const recommendations = data
    .filter((pr) => product.category_id === pr.category_id)
    .filter((pr) =>
      pr.ingredients || pr.ingredients !== null
        ? pr.ingredients.some((ing) => product.ingredients.includes(ing))
        : pr
    );

  return (
    <>
      <h3 className={styles.title}>Рекомендации</h3>

      <Swiper
        modules={[FreeMode, Grid]}
        freeMode={true}
        grabCursor={true}
        spaceBetween={25}
        breakpoints={swiperBreakpoints}
      >
        {recommendations.map((pizza, index) => (
          <SwiperSlide>
            <ProductCard pizza={pizza} className={styles.card} key={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
