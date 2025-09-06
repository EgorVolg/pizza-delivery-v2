import styles from "./Button.module.css";

export default function Button({
  children,
  onClick,
  className,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`${className} ${styles.button}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
