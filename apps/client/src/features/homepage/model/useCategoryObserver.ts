import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import type { PizzaCard } from "../../../entities/pizza/model/pizza.types";
import { setActiveId } from "../../../entities/topbar/categories/model/activeCategories.slice";

type Props = {
  data: PizzaCard[] | undefined;
  sectionRefs: React.RefObject<Record<number, HTMLElement | null>>;
};

export const useCategoryObserver = ({ data, sectionRefs }: Props) => {
  const dispatch = useDispatch();
  const ignoreObserver = useRef(false);

  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (ignoreObserver.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-cat-id"));
            if (!Number.isNaN(id)) dispatch(setActiveId(id));
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data, dispatch, sectionRefs]);

  return { ignoreObserver };
};
