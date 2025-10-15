import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import styles from "./ModalWindow.module.css";
import { useCallback, useEffect, useState } from "react";

const variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const ModalWindow = ({
  children,
  className,
  setIsOpen,
  isOpen, 
}: {
  children: React.ReactNode;
  className?: string;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean; 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const y = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === Drag handlers ===
  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      y.set(Math.max(info.offset.y, 0));
    },
    [y]
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = window.innerHeight * 0.33;
      if (info.offset.y > threshold) {
        setIsOpen(false);
      } else {
        animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
      }
    },
    [y]
  );

  return (
    <motion.div
      className={`${styles.modalWindow} ${className}`}
      style={{ y }}
      initial={false}
      animate={isMobile ? (isOpen ? "visible" : "hidden") : "visible"}
      variants={variants}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onClick={(e) => e.stopPropagation()}
      drag="y"
      dragConstraints={{ top: 0, bottom: 400 }}
      dragElastic={0.1}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.dragContainer}>
        <div className={styles.dragLine} />
      </div>

      <div className={styles.contentContainer}>{children}</div>
    </motion.div>
  );
};
