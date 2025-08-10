import styles from "./Button.module.css";

export default function Button({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
