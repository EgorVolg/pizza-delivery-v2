import styles from "./OrderSectionHeader.module.css";

export const OrderSectionHeader = ({ text }: { text: string }) => {
  return <div className={styles.order_section_header}>{text}</div>;
};
