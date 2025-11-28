import { useState } from "react";
import { useGetProductsQuery } from "../../entities/products/model/products.api";
import Container from "../../shared/ui/Container/Container";
import leftHalve from "./../../shared/assets/pizza_left.png";
import rightHalve from "./../../shared/assets/pizza_right.png";
import PizzaBase from "./../../shared/assets/pizzabase.svg";
import styles from "./PizzaHalves.module.css";
import Button from "../../shared/ui/Button/Button";

export const PizzaHalves = () => {
  const { data: pizzas, isLoading } = useGetProductsQuery();
  const [selectedPizzaHalf, setSelectedPizzaHalf] = useState({
    leftName: "",
    rightName: "",
    leftImage: leftHalve,
    rightImage: rightHalve,
    leftPrice: null,
    rightPrice: null,
    leftId: null,
    rightId: null,
    type: null,
    size: null,
    toppings: [],
  });

  return (
    <main>
      <Container className={styles.pizzaHalvesPage}>
        {/* Список пицц */}
        <section className={styles.pizzaHalvesContainer}>
          <h1 className={styles.pizzaHalvesTitle}>
            Выберите пиццы для левой и правой половинки
          </h1>

          <div className={styles.pizzaHalfGrid}>
            {isLoading ? (
              <p>Загрузка...</p>
            ) : (
              pizzas?.map((pizza) => (
                <article key={pizza.id} className={styles.pizzaCard}>
                  <figure>
                    <img
                      src={pizza.imageUrl}
                      alt={pizza.name}
                      className={styles.pizzaImage}
                    />
                    <figcaption className={styles.pizzaTitle}>
                      {pizza.name}
                    </figcaption>
                  </figure>

                  <p className={styles.pizzaPrice}>
                    {Math.floor(pizza.price * 0.7)} ₽
                  </p>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Конструктор пиццы */}
        <section className={styles.pizzaBuilder}>
          <section className={styles.choosePizzaHalf}>
            <div className={styles.pizzaBaseImages}>
              <img
                className={styles.leftHalf}
                src={selectedPizzaHalf.leftImage}
                alt="Левая половина пиццы"
              />
              <img
                className={styles.rightHalf}
                src={selectedPizzaHalf.rightImage}
                alt="Правая половина пиццы"
              />
            </div>

            <section className={styles.choosePizzaHalfGroup}>
              <aside className={styles.choosePizzaHalfBlock}>
                <img
                  src={PizzaBase}
                  alt="Выберите левую половинку"
                  className={styles.pizzaBaseImg}
                />
                <span>Выберите левую половинку</span>
              </aside>

              <aside className={styles.choosePizzaHalfBlock}>
                <img
                  src={PizzaBase}
                  alt="Выберите правую половинку"
                  className={styles.pizzaBaseImg}
                />
                <span>Выберите правую половинку</span>
              </aside>
            </section>
          </section>

          <section className={styles.params}>
            <aside className={styles.selectors}>
              <div className={styles.selector}>35 см</div>
            </aside>

            <aside className={styles.selectors}>
              {["Тонкое", "Традиционное"].map((type, index) => (
                <div key={index} className={styles.selector}>
                  {type}
                </div>
              ))}
            </aside>

            <aside className={styles.addToCart}>
              <Button className={styles.addToCartButton}>
                Добавить в корзину
              </Button>
            </aside>
          </section>
        </section>
      </Container>
    </main>
  );
};
