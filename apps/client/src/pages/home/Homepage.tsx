import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Homepage.module.css";
import TopBar from "./components/TopBar";
import Container from "../../shared/ui/Container/Container";
import { ProductCard } from "../../widgets/ProductsGrid/ProductCard/ProductCard";
import { useGetPizzasQuery } from "../../entities/pizza/model/pizza.api";
import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";
import ProductCardSkeleton from "../../widgets/ProductsGrid/ProductCard/ui/ProductCard.Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Filters } from "../../features/product-filter/Filters";
import type { FilterStateParams } from "../../features/product-filter/model/filter.dto";
import type { PizzaAPI } from "../../entities/pizza/model/pizza.types";
import type { RootState } from "../../app/store";
import { ProductsSection } from "../../widgets/ProductsGrid/ProductsSection/ProductsSection";
import { CartDrawer } from "../../entities/cart/CartDrawer";
import { Overlay } from "../../shared/ui/Overlay/Overlay";
import { setActiveId } from "../../entities/categories/model/activeCategories.slice";

const pizzaHalves = {
  name: "Пицца из половинок",
  rating: 10,
  popular: 1000,
  price: 300,
  imageUrl:
    "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pizza   halves.avif",
  ingredients: "Собери свою пиццу из половинок!",
  id: 0,
  createdAt: "",
  category_id: 1,
};

export function Homepage() {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const { isLoading, data } = useGetPizzasQuery();
  const { isLoading: isLoadingIngr, data: ingredients } =
    useGetIngredientsQuery();

  const dispatch = useDispatch();
  const isCartDrawerOpen = useSelector(
    (state: RootState) => state.closeOpenCart
  );

  const filterSelector = useSelector(
    (state: RootState) => state.filterParams as FilterStateParams
  );
  const sortSelector = useSelector((state: RootState) => state.sortParams);

  const handleCloseCartDrawer = () => {
    dispatch({ type: "closeOpenCart/setOpenCart", payload: false });
  };

  function toggleMenu() {
    setIsOpenFilters(!isOpenFilters);
  }

  const activeId = useSelector(
    (state: RootState) => state.setActiveId.activeId
  );
  const ignoreObserver = useRef(false);
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});

  /* прокрутка к заголовку */
  const scrollToSection = useCallback((catId: number) => {
    const headerHeight = 350;
    const node = sectionRefs.current[catId]; // ✅ без -1
    if (!node) return;

    ignoreObserver.current = true;
    const top =
      node.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => (ignoreObserver.current = false), 700);
  }, []);

  /* скролл при клике */
  useEffect(() => {
    scrollToSection(activeId);
  }, [activeId, scrollToSection]);

  /* observer для смены категории при скролле */
  useEffect(() => {
    if (!data) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (ignoreObserver.current) return;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = Number(e.target.getAttribute("data-cat-id"));
            if (!Number.isNaN(id)) dispatch(setActiveId(id));
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [dispatch, data]);

  /* скелетон */
  if (isLoading || isLoadingIngr) {
    return (
      <>
        <TopBar toggleMenu={toggleMenu} />
        <Container className={styles.main_container}>
          <nav
            className={`${styles.navbar} ${
              isOpenFilters ? styles.visible : ""
            }`}
          >
            <Filters toggleMenu={toggleMenu} isOpenFilters={isOpenFilters} />
          </nav>

          <Container className={styles.items_container}>
            <div className={styles.items_list}>
              <ProductsSection
                products={[...Array(6)].map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))}
              />
            </div>
          </Container>
        </Container>
      </>
    );
  }

  if (!data || !ingredients) return null;

  /* фильтрация и сортировка */
  const filtered = data
    .filter(
      (pizza) =>
        !filterSelector.ingredients.length ||
        pizza.ingredients.some((id) => filterSelector.ingredients.includes(id))
    )
    .filter(
      (pizza) =>
        !filterSelector.price.length ||
        (pizza.price >= filterSelector.price[0] &&
          pizza.price <= filterSelector.price[1])
    )
    .filter(
      (pizza) =>
        !filterSelector.isNew ||
        (new Date().getTime() - new Date(pizza.createdAt).getTime()) /
          (1000 * 60 * 60 * 24) <=
          3
    )
    .filter(
      (pizza) =>
        !filterSelector.type.length ||
        pizza.type.includes(filterSelector.type[0])
    )
    .sort((a, b) => {
      switch (sortSelector) {
        case "рейтингу":
          return b.rating - a.rating;
        case "популярности":
          return b.popular - a.popular;
        case "цене":
          return a.price - b.price;
        case "алфавиту":
          return a.name.localeCompare(b.name, "ru");
        default:
          return 0;
      }
    });

  /* группировка */
  const grouped: Record<number, PizzaAPI[]> = filtered.reduce((acc, pizza) => {
    const id = pizza.category_id ?? 0;
    (acc[id] ||= []).push(pizza);
    return acc;
  }, {} as Record<number, PizzaAPI[]>);

  /* секции */
  const sections = Object.entries(grouped).map(([catId, pizzas]) => {
    const cards = pizzas.map((pizza) => {
      const pizzaIngredients = ingredients
        ?.filter((ing) => pizza.ingredients.includes(+ing.id))
        .map((ing) => ing.name)
        .join(", ");

      return (
        pizzaIngredients && (
          <ProductCard
            key={pizza.id}
            pizza={{ ...pizza, ingredients: pizzaIngredients }}
          />
        )
      );
    });

    if (+catId === 1) {
      cards.unshift(
        <ProductCard
          key="halves"
          pizza={{ ...pizzaHalves, ingredients: pizzaHalves.ingredients }}
        />
      );
    }

    return (
      <ProductsSection
        key={catId}
        titleID={+catId}
        sectionRef={(el) => (sectionRefs.current[+catId] = el)} // ✅ без -1
        products={<>{cards}</>}
      />
    );
  });

  return (
    <>
      <TopBar toggleMenu={toggleMenu} />
      {isCartDrawerOpen && (
        <Overlay onClick={() => handleCloseCartDrawer()}>
          <CartDrawer handleCloseCartDrawer={handleCloseCartDrawer} />
        </Overlay>
      )}
      <Container className={styles.main_container}>
        <nav
          className={`${styles.navbar} ${isOpenFilters ? styles.visible : ""}`}
        >
          <Filters toggleMenu={toggleMenu} isOpenFilters={isOpenFilters} />
        </nav>

        <main className={styles.items_list}>{sections}</main>
      </Container>
    </>
  );
}
