import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/home/ui/HomePage";
import Container from "../shared/ui/Container/Container";
import Header from "../widgets/Header/ui/Header";
import styles from "./styles/App.module.css";
import { ProductPage } from "../pages/product/ui/ProductPage";
import { Overlay } from "../shared/ui/Overlay/Overlay";
import { CartDrawer } from "../widgets/Cart/ui/CartDrawer";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import type { RootState } from "./store";
import { PizzaModalWindow } from "../features/add-to-cart/PizzaModalWindow";

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
        <Routes>
          // Общая навигация
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<HomePage />} />
          <Route
            path="/products/category/:categoryId/product/:productId"
            element={<ProductPage />}
          />
          // Авторизация
          <Route path="/sign-in" element={<div>Login</div>} />
          <Route path="/sign-up" element={<div>Registration</div>} />
          // Прочее
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/settings" element={<div>Settings</div>} />
          <Route path="/orders" element={<div>Orders</div>} />
          <Route path="/logout" element={<div>Logout</div>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
