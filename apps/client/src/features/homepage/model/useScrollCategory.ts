import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { scrollToCategory, createCategoryObserver } from "./";
import { setActiveId } from "../../../entities/topbar/categories/model/activeCategories.slice";
export function useScrollCategory() {
  const dispatch = useDispatch();
  const ignoreObserver = useRef(false);
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});

  /* скролл к нужной категории по клику */
  function scrollToId(catId: number) {
    scrollToCategory(catId, sectionRefs);
    ignoreObserver.current = true;
    const t = setTimeout(() => (ignoreObserver.current = false), 700);
    return () => clearTimeout(t);
  }

  /* пересоздаём observer каждый раз, когда изменился список секций */
  useEffect(() => {
  const nodes = Object.values(sectionRefs.current).filter(Boolean) as HTMLElement[];
  console.log('observer nodes:', nodes);   // ← должно быть > 0
  if (!nodes.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      console.log('observer fired', entries); // ← должен выводиться при скролле
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = Number(e.target.getAttribute('data-cat-id'));
          if (!Number.isNaN(id)) onChange(id);
        }
      });
    },
    { rootMargin: '0px 0px -30% 0px', threshold: 0.2 }
  );

  nodes.forEach(el => obs.observe(el));
  return () => obs.disconnect();
}, [dispatch, Object.keys(sectionRefs.current).length]); // ← ключевая зависимость