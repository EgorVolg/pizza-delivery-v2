import styles from "./overlay.module.css";

export const Overlay = ({ onClick }: { onClick: () => void }) => {
  return <div className={styles.overlay} onClick={onClick} />;
};
