import Container from "../shared/ui/Container/Container";
import Header from "../widgets/Header/ui/Header";
import styles from "./styles/App.module.css";
import { Overlay } from "../shared/ui/Overlay/Overlay";
import { CartDrawer } from "../widgets/Cart/ui/CartDrawer";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import type { RootState } from "./store";
import { PizzaModalWindow } from "../features/add-to-cart/PizzaModalWindow";
import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const pizzaModalSelector = useSelector((s: RootState) => s.pizzaModal);
  const isCartDrawerOpen = useSelector((s: RootState) => s.closeOpenCart);

  const handleCloseModal = useCallback(() => {
    dispatch({
      type: "pizzaModal/setOpenClosePizzaModal",
      payload: false,
    });
  }, [dispatch]);

  const handleCloseCart = useCallback(() => {
    dispatch({
      type: "closeOpenCart/setCloseOpenCart",
      payload: false,
    });
  }, [dispatch]);

  // Определение мобильного режима
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.app}>
      <AnimatePresence mode="sync">
        {/* === Модальное окно пиццы === */}
        {pizzaModalSelector.open && (
          <Overlay onClick={handleCloseModal}>
            <PizzaModalWindow
              handleCloseModal={handleCloseModal}
              isMobile={isMobile}
            />
          </Overlay>
        )}
        {/* === Корзина === */}
        {isCartDrawerOpen && (
          <>
            <Overlay onClick={handleCloseCart} />
            <CartDrawer handleCloseCart={handleCloseCart} />
          </>
        )}
      </AnimatePresence>

      <Container className={styles.container}>
        <Header />
        <AppRoutes />
        <Toaster position="top-right" />
      </Container>
    </div>
  );
}

export default App;
