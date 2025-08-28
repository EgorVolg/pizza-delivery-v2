import { useState } from "react";
import styles from "./Categories.module.css";
import { useGetCategoriesQuery } from "../model/categories.api";
import { CategoriesSkeleton } from "./Categories.Skeleton";
import type { Category } from "../model/categories.type";

export default function CategoriesList() {
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newCategoryId: number
  ) => {
    event.preventDefault();
    setActiveCategoryId(newCategoryId);
  };

  return (
    <div className={styles.categories}>
      {isLoading
        ? [...Array(6)].map((_, index) => <CategoriesSkeleton key={index} />)
        : categories?.map((category: Category, index: number) => (
            <a
              key={index}
              href="#"
              className={`${styles.category} ${
                activeCategoryId === index ? styles.active : ""
              }`}
              onClick={(event) => handleClick(event, index)}
            >
              {category.name}
            </a>
          ))}
    </div>
  );
}
