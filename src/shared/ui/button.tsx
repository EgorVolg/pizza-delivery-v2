import styles from "./Button.module.css";

export default function Button({ children }: { children: React.ReactNode }) {
  return <div className={styles.button}>{children}</div>;
}
