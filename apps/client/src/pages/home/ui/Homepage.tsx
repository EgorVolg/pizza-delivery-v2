import { useEffect, useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

import styles from "./Homepage.module.css";
import Container from "../../../shared/ui/Container/Container";
import { TopBar } from "../../../widgets/Topbar/TopBar";
import { Filters } from "../../../widgets/Filters/Filters";
import { Overlay } from "../../../shared/ui/Overlay/Overlay";
import ProductCardSkeleton from "../../../entities/homepage/ProductCard/ProductCard.Skeleton";
import { useFilterUrlSync } from "../../../shared/hooks/useFilterUrlSync";
import { PizzaModalWindow } from "../../../features/add-to-cart/PizzaModalWindow";
import { CartDrawer } from "../../../widgets/Cart/ui/CartDrawer";
import { ModalWindow } from "../../../shared/ui/ModalWindow/ModalWindow";
import { useGetAllProductsQuery } from "../../../entities/pizza/model/products.api";
import { ProductsList } from "../../../widgets/ProductsList/ProductsList";

export const Homepage = () => {
  const dispatch = useDispatch();
  const filters = useSelector((s: RootState) => s.filterParams);
  const pizzaModalSelector = useSelector((s: RootState) => s.pizzaModal);
  const isCartDrawerOpen = useSelector((s: RootState) => s.closeOpenCart);
  const sort = useSelector((s: RootState) => s.sortParams);

  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Синхронизация фильтров с URL
  useFilterUrlSync();

  // --- Загрузка данных из всех категорий ---
  const { data: allProducts, isLoading } = useGetAllProductsQuery({
    isNew: filters.isNew,
    priceFrom: filters.price[0],
    priceTo: filters.price[1],
    type: filters.type,
    ingredients: filters.ingredients,
  });

  // --- Обработка фильтров и сортировки ---
  const sortedList = useMemo(() => {
    if (!allProducts) return [];

    const items = [...allProducts];
    switch (sort) {
      case "рейтингу":
        return items.sort((a, b) => b.rating - a.rating);
      case "популярности":
        return items.sort((a, b) => b.popular - a.popular);
      case "цене":
        return items.sort((a, b) => a.price - b.price);
      case "алфавиту":
        return items.sort((a, b) => a.name.localeCompare(b.name, "ru"));
      default:
        return items;
    }
  }, [allProducts, sort]);

  // --- Логика интерфейса ---
  const handleCloseCart = useCallback(() => {
    dispatch({
      type: "closeOpenCart/setCloseOpenCart",
      payload: false,
    });
  }, [dispatch]);

  const toggleMenu = useCallback(() => {
    setIsOpenFilters(false);

    if (window.innerWidth <= 1440) {
      setIsOpenFilters((prev) => !prev);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    dispatch({
      type: "pizzaModal/setOpenClosePizzaModal",
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
    <>
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

        {/* === Фильтры === */}
        {isOpenFilters && (
          <Overlay onClick={toggleMenu}>
            <ModalWindow
              isOpen={isOpenFilters}
              setIsOpen={setIsOpenFilters}
              className={styles.modal_window}
            >
              <button className={styles.xbtn} onClick={toggleMenu}>
                <svg
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
              </button>
              <div className={styles.filters_container}>
                <Filters
                  toggleMenu={toggleMenu}
                  isOpenFilters={isOpenFilters}
                />
              </div>
            </ModalWindow>
          </Overlay>
        )}
      </AnimatePresence>

      <TopBar toggleMenu={toggleMenu} />

      <Container className={styles.main_container}>
        <nav className={styles.navbar}>
          <div className={styles.navbar_container}>
            <Filters toggleMenu={toggleMenu} isOpenFilters={isOpenFilters} />
          </div>
        </nav>

        <main className={styles.items_list}>
          {isLoading ? (
            <div className={styles.loader}>
              {Array.from({ length: 9 }, (_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ProductsList products={sortedList} isLoading={isLoading} />
          )}
        </main>
      </Container>
    </>
  );
};
