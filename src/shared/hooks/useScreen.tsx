import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash-es";

type ScreenType =
  | "desktop"
  | "tablet L"
  | "tablet"
  | "mobile L"
  | "mobile M"
  | "mobile S";

const DEFAULT_SCREEN_TYPE: ScreenType = "desktop";
const DEBOUNCE_DELAY = 100;

export function useScreenType(): ScreenType {
  const [screenType, setScreenType] = useState<ScreenType>(DEFAULT_SCREEN_TYPE);

  const detectScreenType = useCallback(() => {
    // Для SSR-совместимости
    if (typeof window === "undefined") return DEFAULT_SCREEN_TYPE;

    const width = window.innerWidth;

    if (width >= 1280) return "desktop";
    if (width >= 1024) return "tablet L";
    if (width >= 768) return "tablet";
    if (width >= 425) return "mobile L";
    if (width >= 375) return "mobile M";
    if (width >= 320) return "mobile S";

    return DEFAULT_SCREEN_TYPE;
  }, []);

  useEffect(() => {
    // Первоначальное определение
    setScreenType(detectScreenType());

    // Оптимизированный обработчик с debounce
    const debouncedHandleResize = debounce(() => {
      setScreenType(detectScreenType());
    }, DEBOUNCE_DELAY);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      debouncedHandleResize.cancel();
    };
  }, [detectScreenType]);

  return screenType;
}
