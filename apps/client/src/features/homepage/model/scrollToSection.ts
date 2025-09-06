import { useCallback } from "react";

export const useScrollToSection = () => {
  return useCallback((catId: number, sectionRefs: React.MutableRefObject<Record<number, HTMLElement | null>>, ignoreObserver: React.MutableRefObject<boolean>) => {
    const headerHeight = 350;
    const node = sectionRefs.current[catId];
    if (!node) return;

    ignoreObserver.current = true;
    const top = node.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => (ignoreObserver.current = false), 700);
  }, []);
};