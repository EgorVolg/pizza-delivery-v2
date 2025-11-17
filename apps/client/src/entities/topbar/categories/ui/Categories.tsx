import styles from "./Categories.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useMemo, useRef, useEffect } from "react";
import { useGetCategoriesQuery } from "../model/categories.api";
import { CategoriesSkeleton } from "./Categories.Skeleton";
import type { Category } from "../model/categories.types";
import { useDispatch, useSelector } from "react-redux";
import { setActiveId } from "../model/activeCategories.slice";
import type { RootState } from "../../../../app/store";

function CategoriesList() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const selectedCategory = useSelector(
    (state: RootState) => state.activeId.activeId
  );
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleClick = useCallback(
    (event: React.MouseEvent, index: number) => {
      event.preventDefault();
      if (clickTimeoutRef.current) return;

      dispatch(setActiveId(index));

      clickTimeoutRef.current = setTimeout(() => {
        clickTimeoutRef.current = null;
      }, 350);
    },
    [dispatch]
  );

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollToActive = useCallback((index: number) => {
    if (scrollTimeoutRef.current) return;

    scrollTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        const activeElement = containerRef.current.querySelector(
          `[data-index="${index}"]`
        ) as HTMLElement | null;
        activeElement?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
      scrollTimeoutRef.current = null;
    }, 100);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      scrollToActive(selectedCategory - 1);
    }
  }, [selectedCategory, scrollToActive]);

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
    <AnimatePresence initial={false}>
      <motion.div
        ref={containerRef}
        className={`${styles.categories} ${styles.visible}`}
        style={{
          originY: 0,
          ...(isLoading ? { backgroundColor: "#F5F5F5" } : {}),
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {categoryElements}
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(CategoriesList);
