import { useState } from "react";
import styles from "./Homepage.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import Container from "../../../shared/ui/Container/Container";
import TopBar from "../../../widgets/Topbar/TopBar";
import { CartDrawer } from "../../../widgets/Cart/ui/CartDrawer";
import { Overlay } from "../../../shared/ui/Overlay/Overlay";
import { Filters } from "../../../widgets/Filters/Filters";

import { ProductsList } from "../../../widgets/ProductsList/ProductsList";

export function Homepage() {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const dispatch = useDispatch();
  const isCartDrawerOpen = useSelector((s: RootState) => s.closeOpenCart);

  const handleCloseCart = () =>
    dispatch({ type: "closeOpenCart/setOpenCart", payload: false });

  const toggleMenu = () => setIsOpenFilters((v) => !v);

  return (
    <>
      <TopBar toggleMenu={toggleMenu} />

      {isCartDrawerOpen && (
        <>
          <Overlay />
          <CartDrawer handleCloseCartDrawer={handleCloseCart} />
        </>
      )}

      <Container className={styles.main_container}>
        <nav
          className={`${styles.navbar} ${isOpenFilters ? styles.visible : ""}`}
        >
          <Filters toggleMenu={toggleMenu} isOpenFilters={isOpenFilters} />
        </nav>

        <main className={styles.items_list}>
          <ProductsList />
        </main>
      </Container>
    </>
  );
}
