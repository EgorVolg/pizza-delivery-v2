 import styles from "./Button.module.css";

export default function Button({
  children,
  onClick,
  className,
  disabled,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: unknown;
}) {
  return (
    <button
      className={`${className} ${styles.button}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
