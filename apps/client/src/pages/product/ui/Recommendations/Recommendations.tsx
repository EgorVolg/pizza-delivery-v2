import { useEffect, useState, useRef } from "react";
import type { PizzaCard } from "../../../../entities/products/model/pizza.types";
import { useGetAllProductsQuery } from "../../../../entities/products/model/products.api";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import { RecSwiper } from "./RecSwiper";
import { SwiperButtons } from "./SwiperButtons";
import styles from "./Recommendations.module.css";

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
        {!isMobile && <SwiperButtons />}
      </div>

      <RecSwiper
        recommendations={recommendations}
        isMobile={isMobile}
        swiperRef={swiperRef}
      />

      {isMobile && <SwiperButtons />}
    </div>
  );
};
