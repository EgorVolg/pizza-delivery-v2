import { useLockScroll } from "../../hooks/useLockScroll";
import styles from "./Overlay.module.css";

export const Overlay = ({
  onClick,
  children,
  className,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}) => {
  useLockScroll(true);
  
  return (
    <div className={`${styles.overlay} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
