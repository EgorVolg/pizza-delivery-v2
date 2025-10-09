import { useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  AnimatePresence,
  animate,
  type PanInfo,
} from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

import styles from "./Homepage.module.css";
import Container from "../../../shared/ui/Container/Container";
import { TopBar } from "../../../widgets/Topbar/TopBar";
import { Filters } from "../../../widgets/Filters/Filters";
import { ProductsList } from "../../../widgets/ProductsList/ProductsList";
import { Overlay } from "../../../shared/ui/Overlay/Overlay";
import { useGetPizzasQuery } from "../../../entities/pizza/model/pizza.api";
import ProductCardSkeleton from "../../../entities/homepage/ProductCard/ProductCard.Skeleton";
import { useFilterUrlSync } from "../../../shared/hooks/useFilterUrlSync";
import { PizzaModalWindow } from "../../../features/add-to-cart/PizzaModalWindow";
import { CartDrawer } from "../../../widgets/Cart/ui/CartDrawer";

const variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const Homepage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useGetPizzasQuery();
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const y = useMotionValue(0);

  const pizzaModalSelector = useSelector((s: RootState) => s.pizzaModal);
  const isCartDrawerOpen = useSelector((s: RootState) => s.closeOpenCart);

  const handleCloseCart = useCallback(() => {
    dispatch({
      type: "closeOpenCart/setCloseOpenCart",
      payload: false,
    });
  }, [dispatch]);

  const toggleMenu = useCallback(() => {
    setIsOpenFilters((prev) => !prev);
  }, []);

  useFilterUrlSync();

  // Определение мобильного режима
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1440);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === Drag handlers ===
  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      y.set(Math.max(info.offset.y, 0)); // не даём двигать вверх
    },
    [y]
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = window.innerHeight * 0.33;
      if (info.offset.y > threshold) {
        setIsOpenFilters(false);
      } else {
        animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
      }
    },
    [y]
  );

  return (
    <>
      {/* === Модальное окно пиццы === */}
      {pizzaModalSelector.open && (
        <Overlay>
          <Container className={styles.modal_container}>
            <PizzaModalWindow />
          </Container>
        </Overlay>
      )}

      {/* === Корзина === */}
      <AnimatePresence mode="sync">
        {isCartDrawerOpen && (
          <>
            <Overlay onClick={handleCloseCart} />
            <CartDrawer handleCloseCart={handleCloseCart} />
          </>
        )}
      </AnimatePresence>

      <TopBar toggleMenu={toggleMenu} />

      <Container className={styles.main_container}>
        <motion.nav
          className={styles.navbar}
          style={{ y }}
          initial={false}
          animate={
            isMobile ? (isOpenFilters ? "visible" : "hidden") : "visible"
          }
          variants={variants}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
          drag="y"
          dragConstraints={{ top: 0, bottom: 400 }}
          dragElastic={0.1}
          onDrag={(_, info) => {
            // ограничиваем движение только вниз
            y.set(Math.max(info.offset.y, 0));
          }}
          onDragEnd={(_, info) => {
            const threshold = window.innerHeight * 0.33;
            if (info.offset.y > threshold) {
              setIsOpenFilters(false);
            } else {
              animate(y, 0, {
                type: "spring",
                stiffness: 300,
                damping: 30,
              });
            }
          }}
        >
          {isOpenFilters && (
            <>
              {/* === Линия для drag === */}
              <motion.div className={styles.line} />

              {/* === Кнопка закрытия === */}
              <svg
                onClick={toggleMenu}
                className={styles.xbtn}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4492 14.9174L29.5992 2.76743C29.8723 2.44859 30.015 2.03847 29.9988 1.61901C29.9826 1.19955 29.8087 0.801647 29.5118 0.504823C29.215 0.207998 28.8171 0.0341104 28.3977 0.0179084C27.9782 0.00170651 27.5681 0.144384 27.2492 0.417428L15.0992 12.5674L2.94924 0.400761C2.6304 0.127717 2.22028 -0.0149589 1.80082 0.00124298C1.38136 0.0174449 0.983459 0.191331 0.686635 0.488156C0.389811 0.78498 0.215923 1.18288 0.199721 1.60234C0.183519 2.0218 0.326196 2.43192 0.59924 2.75076L12.7492 14.9174L0.582573 27.0674C0.408104 27.2168 0.266403 27.4007 0.166364 27.6075C0.0663255 27.8143 0.0101078 28.0395 0.00124197 28.269C-0.00762386 28.4985 0.0310527 28.7274 0.114844 28.9413C0.198635 29.1552 0.325732 29.3494 0.488156 29.5118C0.650581 29.6743 0.844826 29.8014 1.0587 29.8852C1.27258 29.9689 1.50146 30.0076 1.731 29.9988C1.96053 29.9899 2.18575 29.9337 2.39252 29.8336C2.5993 29.7336 2.78316 29.5919 2.93257 29.4174L15.0992 17.2674L27.2492 29.4174C27.5681 29.6905 27.9782 29.8331 28.3977 29.8169C28.8171 29.8007 29.215 29.6269 29.5118 29.33C29.8087 29.0332 29.9826 28.6353 29.9988 28.2158C30.015 27.7964 29.8723 27.3863 29.5992 27.0674L17.4492 14.9174Z"
                  fill="#000000"
                />
              </svg>
            </>
          )}

          <div className={styles.navbar_container}>
            <Filters toggleMenu={toggleMenu} isOpenFilters={isOpenFilters} />
          </div>
        </motion.nav>

        {isOpenFilters && <Overlay className={styles.filters_overlay} />}

        <main className={styles.items_list}>
          {isLoading ? (
            <div className={styles.loader}>
              {Array.from({ length: 9 }, (_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ProductsList />
          )}
        </main>
      </Container>
    </>
  );
};
