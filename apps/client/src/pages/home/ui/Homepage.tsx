import { useState } from "react";
import styles from "./Homepage.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import Container from "../../../shared/ui/Container/Container";
import TopBar from "../../../widgets/Topbar/TopBar";
import { CartDrawer } from "../../../widgets/Cart/ui/CartDrawer";
import { Filters } from "../../../widgets/Filters/Filters";

import { ProductsList } from "../../../widgets/ProductsList/ProductsList";
import { AnimatePresence } from "framer-motion";
import { Overlay } from "../../../shared/ui/Overlay/Overlay";
import { useGetPizzasQuery } from "../../../entities/pizza/model/pizza.api";
import ProductCardSkeleton from "../../../entities/homepage/ProductCard/ProductCard.Skeleton";
import { useFilterUrlSync } from "../../../shared/hooks/useFilterUrlSync";

export function Homepage() {
  const { isLoading } = useGetPizzasQuery();
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const dispatch = useDispatch();
  const isCartDrawerOpen = useSelector((s: RootState) => s.closeOpenCart);

  // Sync filters with URL
  useFilterUrlSync()

  const handleCloseCart = () =>
    dispatch({ type: "closeOpenCart/setOpenCart", payload: false });

  const toggleMenu = () => setIsOpenFilters((v) => !v);

  return (
    <>
      <TopBar toggleMenu={toggleMenu} />

      <AnimatePresence mode="sync">
        {isCartDrawerOpen && (
          <>
            <Overlay onClick={handleCloseCart} />
            <CartDrawer handleCloseCartDrawer={handleCloseCart} />
          </>
        )}
      </AnimatePresence>

      <Container className={styles.main_container}>
        <nav
          className={`${styles.navbar} ${isOpenFilters ? styles.visible : ""}`}
        >
          <Filters toggleMenu={toggleMenu} isOpenFilters={isOpenFilters} />
        </nav>

        <main className={styles.items_list}>
          {isLoading && (
            <div className={styles.loader}>
              {[...Array(9)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}
          <ProductsList />
        </main>
      </Container>
    </>
  );
}
