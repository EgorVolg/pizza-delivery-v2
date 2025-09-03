import styles from "./Overlay.module.css";

export const Overlay = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  );
};
