import { useState } from "react";
import { useGetProductsQuery } from "../../entities/products/model/products.api";
import Container from "../../shared/ui/Container/Container";
import leftHalve from "./../../shared/assets/pizza_left.png";
import rightHalve from "./../../shared/assets/pizza_right.png";
import PizzaBase from "./../../shared/assets/pizzabase.svg";
import styles from "./PizzaHalves.module.css";
import Button from "../../shared/ui/Button/Button";
import type { PizzaResponse } from "../../entities/products/model/pizza.types";
import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";
import { useAddCartItemMutation } from "../../entities/cart/model/cart.api";
import type { TCartItem } from "../../entities/cart/model/cart.types";
import toast from "react-hot-toast";

export const PizzaHalves = ({
  isMobile,
  handleCloseModal,
}: {
  isMobile: boolean;
  handleCloseModal: () => void;
}) => {
  const { data: pizzas, isLoading } = useGetProductsQuery();
  const { data: ingredientsResponse } = useGetIngredientsQuery();
  const [addCartItem] = useAddCartItemMutation();

  const [selectedPizzaHalf, setSelectedPizzaHalf] = useState({
    selectedPizzas: [] as Array<{
      id: number;
      name: string;
      price: number;
      leftHalf: string;
      rightHalf: string;
      imageUrl: string;
    }>,
    type: ["Тонкое"],
    size: ["35"],
    toppings: [],
  });

  // --- Функция для разрезания изображения пиццы ---
  const splitPizzaImage = async (imageUrl: string) => {
    return new Promise<{ left: string; right: string }>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // Левый canvas
        const canvasLeft = document.createElement("canvas");
        canvasLeft.width = width / 2;
        canvasLeft.height = height;
        const ctxLeft = canvasLeft.getContext("2d");
        ctxLeft?.drawImage(
          img,
          0,
          0,
          width / 2,
          height,
          0,
          0,
          width / 2,
          height,
        );

        // Правый canvas
        const canvasRight = document.createElement("canvas");
        canvasRight.width = width / 2;
        canvasRight.height = height;
        const ctxRight = canvasRight.getContext("2d");
        ctxRight?.drawImage(
          img,
          width / 2,
          0,
          width / 2,
          height,
          0,
          0,
          width / 2,
          height,
        );

        resolve({
          left: canvasLeft.toDataURL("image/webp", 1),
          right: canvasRight.toDataURL("image/png", 1),
        });
      };

      img.onerror = (err) => reject(err);
    });
  };

  // --- Обработчик выбора пиццы ---
  const handleChoosePizzaHalf = async (pizza: PizzaResponse) => {
    const exists = selectedPizzaHalf.selectedPizzas.some(
      (p) => p.id === pizza.id,
    );

    if (exists) {
      setSelectedPizzaHalf({
        ...selectedPizzaHalf,
        selectedPizzas: selectedPizzaHalf.selectedPizzas.filter(
          (p) => p.id !== pizza.id,
        ),
      });
      return;
    }

    const halves = await splitPizzaImage(pizza.imageUrl);

    const newPizza = {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      leftHalf: halves.left,
      rightHalf: halves.right,
      imageUrl: pizza.imageUrl,
    };

    let updatedPizzas = [...selectedPizzaHalf.selectedPizzas, newPizza];

    if (updatedPizzas.length > 2) {
      updatedPizzas = [newPizza]; // если уже 2, оставляем только последнюю
    }

    setSelectedPizzaHalf({
      ...selectedPizzaHalf,
      selectedPizzas: updatedPizzas,
    });
  };

  const pizzaDescription = (selectedPizzaId: number) => {
    const pizzaIngredients = pizzas
      ?.find((p) => p.id === selectedPizzaId)
      ?.ingredients.map((ingredientId) => {
        const ingredient = ingredientsResponse?.find(
          (ing) => ing.id === ingredientId,
        );

        return ingredient ? ingredient.name : "";
      })
      .join(", ");

    return pizzaIngredients;
  };

  const handleAddToCart = () => {
    const ingredientsNames = [
      pizzaDescription(selectedPizzaHalf.selectedPizzas[0].id),
      pizzaDescription(selectedPizzaHalf.selectedPizzas[1].id),
    ]
      .map((name) => name)
      .join(", ");

    const id =
      selectedPizzaHalf.selectedPizzas[0].id +
      +selectedPizzaHalf.selectedPizzas[1].id;

    const pizzaParams = {
      id: id,
      cart_id: "550e8400-e29b-41d4-a716-446655440000",
      name: `${selectedPizzaHalf.selectedPizzas[0].name} + ${selectedPizzaHalf.selectedPizzas[1].name}`,
      imageUrl: selectedPizzaHalf.selectedPizzas[0].imageUrl,
      price:
        selectedPizzaHalf.selectedPizzas[0].price +
        selectedPizzaHalf.selectedPizzas[1].price,
      ingredients: ingredientsNames,
      toppings: null,
      productQuantity: "1",
      type: selectedPizzaHalf.type[0],
      weight: null,
      size: selectedPizzaHalf.size[0],
      quantity: 1,
    };

    toast.success("Товар добавлен в корзину");
    addCartItem(pizzaParams);
    handleCloseModal();
  };

  return (
    <main>
      {!isMobile && (
        <button className={styles.xbtnContainer} onClick={handleCloseModal}>
          <svg
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
        </button>
      )}

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
                <article
                  key={pizza.id}
                  className={styles.pizzaCard}
                  onClick={() => handleChoosePizzaHalf(pizza)}
                >
                  <figure>
                    <img
                      src={pizza.imageUrl}
                      alt={pizza.name}
                      className={`${styles.pizzaImage}  ${
                        selectedPizzaHalf.selectedPizzas.some(
                          (p) => p.id === pizza.id,
                        )
                          ? styles.active
                          : ""
                      }`}
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
            <div
              className={`${styles.pizzaBaseImages} ${
                selectedPizzaHalf.selectedPizzas.length === 2
                  ? styles.joined
                  : ""
              }`}
            >
              <img
                className={styles.leftHalf}
                src={selectedPizzaHalf.selectedPizzas[0]?.leftHalf ?? leftHalve}
                alt="Левая половина пиццы"
              />

              <img
                className={styles.rightHalf}
                src={
                  selectedPizzaHalf.selectedPizzas[1]?.rightHalf ?? rightHalve
                }
                alt="Правая половина пиццы"
              />
            </div>

            <section className={styles.choosePizzaHalfGroup}>
              <aside className={styles.choosePizzaHalfBlock}>
                <img
                  src={
                    selectedPizzaHalf.selectedPizzas[0]?.imageUrl ?? PizzaBase
                  }
                  alt="Выберите левую половинку"
                  className={styles.pizzaBaseImg}
                />
                {selectedPizzaHalf.selectedPizzas[0] ? (
                  <div>
                    <div className={styles.pizzaName}>
                      {selectedPizzaHalf.selectedPizzas[0]?.name}
                    </div>
                    <div className={styles.pizzaDescription}>
                      {pizzaDescription(selectedPizzaHalf.selectedPizzas[0].id)}
                    </div>
                  </div>
                ) : (
                  <span>Выберите правую половинку</span>
                )}
              </aside>

              <aside className={styles.choosePizzaHalfBlock}>
                <img
                  src={
                    selectedPizzaHalf.selectedPizzas[1]?.imageUrl ?? PizzaBase
                  }
                  alt="Выберите правую половинку"
                  className={styles.pizzaBaseImg}
                />
                {selectedPizzaHalf.selectedPizzas[1] ? (
                  <div className={styles.pizzaDescriptionBlock}>
                    <div className={styles.pizzaName}>
                      {selectedPizzaHalf.selectedPizzas[1]?.name}
                    </div>
                    <div className={styles.pizzaDescription}>
                      {pizzaDescription(selectedPizzaHalf.selectedPizzas[1].id)}
                    </div>
                  </div>
                ) : (
                  <span>Выберите правую половинку</span>
                )}
              </aside>
            </section>
          </section>

          <section className={styles.params}>
            <aside className={styles.selectors}>
              <div className={styles.selector + " " + styles.active}>35 см</div>
            </aside>

            <aside className={styles.selectors}>
              {["Тонкое", "Традиционное"].map((type) => (
                <div
                  key={type}
                  onClick={() =>
                    setSelectedPizzaHalf({
                      ...selectedPizzaHalf,
                      type: [type],
                    })
                  }
                  className={`${styles.selector} ${
                    selectedPizzaHalf.type[0] === type ? styles.active : ""
                  }`}
                >
                  {type}
                </div>
              ))}
            </aside>

            <aside className={styles.addToCart}>
              <Button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                Добавить в корзину
              </Button>
            </aside>
          </section>
        </section>
      </Container>
    </main>
  );
};
