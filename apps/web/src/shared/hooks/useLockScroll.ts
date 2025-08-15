import { useEffect } from "react";

export const useLockScroll = (params: any) => {
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
