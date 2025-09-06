import { type JSX } from "react";
import styles from "./ProductsSection.module.css";
import { useGetCategoriesQuery } from "../../topbar/categories/model/categories.api";

export const ProductsSection = ({
  products,
  titleID,
  sectionRef,
}: {
  products: JSX.Element;
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

      <div className={styles.grid}>{products}</div>
    </section>
  );
};
