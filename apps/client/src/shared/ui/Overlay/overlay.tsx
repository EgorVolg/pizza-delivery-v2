import { useLockScroll } from "../../hooks/useLockScroll";
import styles from "./Overlay.module.css";

export const Overlay = ({
  onClick,
  children,
  className,
  style,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  useLockScroll(true);

  return (
    <div
      className={`${styles.overlay} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};
