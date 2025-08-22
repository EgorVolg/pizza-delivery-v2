import { useState } from "react";

import styles from "./Homepage.module.css";
import Header from "../../widgets/Header/Header";
import TopBar from "./components/TopBar";
import Container from "../../shared/ui/Container/Container";
import { Filters } from "../../shared/components/Filters";
import { ProductCard } from "../../widgets/ProductsGrid/ProductCard/ProductCard";
import { useGetPizzasQuery } from "../../entities/pizza/model/pizza.api";

import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";
import ProductCardSkeleton from "../../widgets/ProductsGrid/ProductCard/ProductCardSkeleton";

const pizzaHalves = {
  name: "Пицца из половинок",
  rating: 10,
  popular: 1000,
  price: 300,
  imageUrl:
    "https://bihemgflzeaaltqlvqeh.supabase.co/storage/v1/object/public/pizza-images/Pizza halves.avif",
};

export function Homepage() {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const { isLoading, data } = useGetPizzasQuery();
  const { isLoading: isLoadingIngr, data: ingredients } =
    useGetIngredientsQuery();

  function toggleMenu() {
    setIsOpenFilters(!isOpenFilters);
  }

  return (
    <>
      <Header />
      <TopBar toggleMenu={toggleMenu} />

      <Container className={styles.main_container}>
        <nav
          className={`${styles.navbar} ${
            isOpenFilters ? (isOpenFilters ? styles.visible : "") : ""
          }`}
        >
          <Filters toggleMenu={toggleMenu} isOpenFilters={isOpenFilters} />
        </nav>

        <Container className={styles.items_container}>
          <div className={styles.items_list}>
            <section className={styles.grid}>
              <ProductCard
                pizza={pizzaHalves}
                ingredients="В основе пиццы увеличенная порция моцареллы и фирменный томатный соус, а другие ингредиенты можно выбрать на свой вкус"
              />

              {!isLoading && !isLoadingIngr
                ? data?.map((pizza: any, index: number) => {
                    const pizzaIngredients =
                      ingredients
                        ?.filter((ingredient) =>
                          pizza.ingredients.includes(+ingredient.id)
                        )
                        .map((ing) => ing.name) || [];

                    return (
                      <ProductCard
                        key={index}
                        pizza={pizza}
                        ingredients={pizzaIngredients.join(", ")}
                      />
                    );
                  })
                : [...Array(9)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
            </section>
          </div>
        </Container>
      </Container>
    </>
  );
}
