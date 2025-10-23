import { useRef } from "react";
import { useMotionValue, type PanInfo } from "framer-motion";

interface UseModalDragProps {
  onClose?: () => void;
}

export const useModalDrag = ({ onClose }: UseModalDragProps) => {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const y = useMotionValue(0);

  const dragProps = {
    drag: "y" as const,
    dragConstraints: { top: 0, bottom: 300 },
    style: { y },
    dragElastic: 0.2,
    onDragEnd: (info: PanInfo) => {
      if (info.offset.y > 120) onClose?.();
    },
  };

  return { constraintsRef, dragProps };
};
