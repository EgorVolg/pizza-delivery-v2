import { useSelector } from "react-redux";
import styles from "./PizzaModalWindow.module.css";
import { PizzaHalves } from "./PizzaHalves";
import { Product } from "./Product";
import type { RootState } from "../../app/store";
import { ModalWindow } from "../../shared/ui/ModalWindow/ModalWindow";

export const PizzaModalWindow = ({
  handleCloseModal,
  isMobile,
}: {
  handleCloseModal: () => void;
  isMobile: boolean;
}) => {
  const selector = useSelector((s: RootState) => s.pizzaModal);

  return (
    <ModalWindow
      className={styles.modalWindow}
      setIsOpen={handleCloseModal}
      isOpen={selector.open}
    >
      {selector.categoryId === 1 && selector.id === 0 ? (
        <PizzaHalves isMobile={isMobile} handleCloseModal={handleCloseModal} />
      ) : (
        <Product isMobile={isMobile} handleCloseModal={handleCloseModal} />
      )}
    </ModalWindow>
  );
};
