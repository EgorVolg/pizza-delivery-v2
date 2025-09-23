import styles from "./Xbtn.module.css";

const Xbtn = ({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button className={`${styles.Xbtn} ${className}`} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30"
        viewBox="0 -960 960 960"
        width="30"
        fill="#adadad"
      >
        <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
      </svg>
    </button>
  );
};

export default Xbtn;
