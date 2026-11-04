import type { PizzaCard } from "../../../../entities/products/model/pizza.types";
import { useGetAllProductsQuery } from "../../../../entities/products/model/products.api";
// @ts-ignore Swiper's CSS is bundled at runtime and has no side-effect import declaration.
import "swiper/css";
import { RecSwiper } from "./RecSwiper";
import { SwiperButtons } from "./SwiperButtons";
import styles from "./Recommendations.module.css";

export const Recommendations = ({ product }: { product: PizzaCard }) => {
  const { data } = useGetAllProductsQuery();

  if (!data) return null;
  const recommendations = data
    .filter((pr) => product.category_id === pr.category_id)
    .filter((pr) =>
      pr.ingredients || pr.ingredients !== null
        ? pr.ingredients.some((ing) => product.ingredients.includes(ing.toString()))
        : pr
    );

  return (
    <div className={styles.recommendations}>
      <div className={styles.title_container}>
        <h3 className={styles.title}>Рекомендации</h3>
        <SwiperButtons />
      </div>

      <RecSwiper recommendations={recommendations} />
    </div>
  );
};
