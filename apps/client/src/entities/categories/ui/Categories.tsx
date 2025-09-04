import styles from "./Categories.module.css";
import { useGetCategoriesQuery } from "../model/categories.api";
import { CategoriesSkeleton } from "./Categories.Skeleton";
import type { Category } from "../model/categories.type";
import { useDispatch, useSelector } from "react-redux";

export default function CategoriesList() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const selectedCategory = useSelector(
    (state: any) => state.setActiveId.activeId
  );
  const handleSelectCategoryId = useDispatch();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newCategoryId: number
  ) => {
    event.preventDefault();
    handleSelectCategoryId({
      type: "category/setActiveId",
      payload: newCategoryId,
    });
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
                selectedCategory === index + 1 ? styles.active : ""
              }`}
              onClick={(event) => handleClick(event, index + 1)}
            >
              {category.name}
            </a>
          ))}
    </div>
  );
}
