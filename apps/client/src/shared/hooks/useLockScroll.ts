import { useEffect } from "react";

export const useLockScroll = (params: boolean) => {
  useEffect(() => {
    if (params) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [params]);
};
