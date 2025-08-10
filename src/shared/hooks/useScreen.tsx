import { useState, useEffect } from "react";
import { debounce } from "lodash-es";

const DEBOUNCE_DELAY = 100;
const DEFAULT_WIDTH = 2560;

export function useScreenWidth() {
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    const debouncedHandleResize = debounce(handleResize, DEBOUNCE_DELAY);

    window.addEventListener("resize", debouncedHandleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      debouncedHandleResize.cancel();
    };
  }, []);

  return width;
}
