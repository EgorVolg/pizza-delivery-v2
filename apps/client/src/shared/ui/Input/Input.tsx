import styles from "./Input.module.css";
import { InputSkeleton } from "./ui/Input.Skeleton";

type Props = {
  isLoading?: boolean;
  placeholder: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
};

export const Input = (props: Props) => {
  return (
    <>
      {props.isLoading ? (
        <InputSkeleton />
      ) : (
        <input
          className={`${styles.input} ${props.className}`}
          type="text"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          ref={props.ref}
        />
      )}
    </>
  );
};
