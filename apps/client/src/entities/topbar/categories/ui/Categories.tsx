import styles from "./Categories.module.css";
import { motion } from "framer-motion";
import { memo, useCallback, useMemo, useRef, useEffect } from "react";
import { useGetCategoriesQuery } from "../model/categories.api";
import { CategoriesSkeleton } from "./Categories.Skeleton";
import type { Category } from "../model/categories.types";
import { useDispatch, useSelector } from "react-redux";
import { setActiveId } from "../model/activeCategories.slice";

function CategoriesList() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const selectedCategory = useSelector(
    (state: any) => state.setActiveId.activeId
  );
  const selectCategoryId = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCategory && containerRef.current) {
      const activeElement = containerRef.current.querySelector(
        `[data-index="${selectedCategory - 1}"]`
      );
      activeElement?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedCategory]);

  const handleClick = useCallback(
    (event: React.MouseEvent, index: number) => {
      event.preventDefault();
      selectCategoryId(setActiveId(index));
    },
    [selectCategoryId]
  );

  const categoryElements = useMemo(() => {
    if (isLoading) {
      return [...Array(6)].map((_, index) => (
        <CategoriesSkeleton key={index} />
      ));
    }

    return categories?.map((category: Category, index: number) => {
      const isActive = selectedCategory === index + 1;

      return (
        <motion.a
          key={index}
          href="#"
          className={styles.category}
          data-index={index}
          onClick={(event) => handleClick(event, index + 1)}
          animate={{
            backgroundColor: isActive ? "#fff" : "transparent",
            color: isActive ? "#fe5f00" : "#000",
            boxShadow: isActive
              ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              : "0px 0px 0px rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ textWrap: "nowrap" }}
        >
          {category.name}
        </motion.a>
      );
    });
  }, [categories, selectedCategory, isLoading, handleClick]);

  return (
    <div
      ref={containerRef}
      className={styles.categories}
      style={isLoading ? { backgroundColor: "#F5F5F5" } : {}}
    >
      {categoryElements}
    </div>
  );
}

export default memo(CategoriesList);
