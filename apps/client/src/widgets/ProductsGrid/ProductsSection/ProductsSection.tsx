import type { JSX } from "react";
import styles from "./ProductsSection.module.css";
import { useGetCategoriesQuery } from "../../../entities/categories/model/categories.api";

export const ProductsSection = ({
  products,
  titleID,
}: {
  products: JSX.Element;
  titleID: number;
}) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  if (isLoading) return null;

  const category = categories?.find((c) => +c.id === titleID);
  const categoryTitle = category?.name;

  return (
    <>
      <h2 className={styles.title}>{categoryTitle}</h2>
      <section className={styles.grid}>{products}</section>
    </>
  );
};
