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
import { useSelector } from "react-redux";

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

  const selector = useSelector((state: any) => state.filterParams);

  function toggleMenu() {
    setIsOpenFilters(!isOpenFilters);
  }

  const pizzas = () => {
    if (isLoading || isLoadingIngr)
      return [...Array(6)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ));

    if (!data || !ingredients) return null;

    return (
      <>
        <ProductCard
          pizza={pizzaHalves}
          ingredients="Собери свою пиццу из половинок"
        />
        {data
          .filter((pizza: any) => {
            if (selector.ingredients.length === 0) return true;
            return pizza.ingredients.some((ingredientId: number) => {
              return selector.ingredients.includes(ingredientId);
            });
          })
          .filter((pizza: any) => {
            if (selector.price.length === 0) return true;

            const [min, max] = selector.price;

            return pizza.price >= min && pizza.price <= max;
          })

          .filter((pizza: any) => {
            if (!selector.isNew) return true;

            const created = new Date(pizza.createdAt);
            const now = new Date();
            const diffMs = now.getTime() - created.getTime();
            const diffDays = diffMs / (1000 * 60 * 60 * 24);

            return diffDays <= 3;
          })
          .filter((pizza: any) => {
            console.log(selector.type);
            
            if (selector.type.length === 0) return true;
            return pizza.type.includes(+selector.type);
          })
          .map((pizza: any, index: number) => {
            const pizzaIngredients = ingredients
              .filter((ingredient) =>
                pizza.ingredients.includes(+ingredient.id)
              )
              .map((ingredient) => ingredient.name)
              .join(", ");

            if (!pizzaIngredients) return null;
            return (
              <ProductCard
                key={index}
                pizza={{
                  name: pizza.name,
                  rating: pizza.rating,
                  popular: pizza.popular,
                  price: pizza.price,
                  imageUrl: pizza.imageUrl,
                }}
                ingredients={pizzaIngredients}
              />
            );
          })}
      </>
    );
  };

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
            <section className={styles.grid}>{pizzas()}</section>
          </div>
        </Container>
      </Container>
    </>
  );
}
