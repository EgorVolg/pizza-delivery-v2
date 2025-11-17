import { useEffect, useRef, useState } from "react";

export const useScrollDirectionUp = (throttleMs: number) => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const lastScrollY = useRef(0);
  const lastCall = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();

      if (now - lastCall.current < throttleMs) return;
      lastCall.current = now;

      const currentY = window.scrollY;

      if (currentY < lastScrollY.current) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [throttleMs]);

  return isScrollingUp;
};
