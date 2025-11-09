import styles from "./ProductsSection.module.css";
import { useGetCategoriesQuery } from "../../topbar/categories/model/categories.api";
import { ProductCard } from "../ProductCard/ProductCard";
import type { PizzaResponse } from "../../pizza/model/pizza.types";

export const ProductsSection = ({
  products,
  titleID,
  sectionRef,
}: {
  products: PizzaResponse[];
  titleID: number;
  sectionRef?: React.Ref<HTMLHeadingElement>;
}) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  if (isLoading) return null;

  const category = categories?.find((c) => +c.id === titleID);
  const categoryTitle = category?.name;

  return (
    <section>
      <h2
        className={styles.title}
        id={`cat-${titleID}`}
        data-cat-id={titleID}
        ref={sectionRef}
      >
        {categoryTitle}
      </h2>

      <div className={styles.grid}>
        {products.map((pizza, index) => (
          <ProductCard key={index} pizza={pizza} />
        ))}
      </div>
    </section>
  );
};
