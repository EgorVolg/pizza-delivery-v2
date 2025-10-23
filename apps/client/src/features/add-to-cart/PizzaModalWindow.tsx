import { useSelector } from "react-redux";
import styles from "./PizzaModalWindow.module.css";
import Button from "../../shared/ui/Button/Button";
import type { PizzaTopping } from "../../entities/pizza/model/pizza.types";
import { useState, useEffect } from "react";
import { useGetPizzaToppingsQuery } from "../../entities/pizza/model/pizzatoppings.api";
import { useAddCartItemMutation } from "../../entities/cart/model/cart.api";
import type { RootState } from "../../app/store";
import { ModalWindow } from "../../shared/ui/ModalWindow/ModalWindow";
import { useGetProductByIdQuery } from "../../entities/pizza/model/products.api";
import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";

export const PizzaModalWindow = ({
  handleCloseModal,
  isMobile,
}: {
  handleCloseModal: () => void;
  isMobile: boolean;
}) => {
  const { data: toppings } = useGetPizzaToppingsQuery();
  const [addCartItem] = useAddCartItemMutation();
  const [activeTopping, setActiveTopping] = useState([] as PizzaTopping[]);
  const selector = useSelector((s: RootState) => s.pizzaModal);
  const pizzaQuery = useGetProductByIdQuery(selector.id);
  const ingredientsQuery = useGetIngredientsQuery();

  const pizza = pizzaQuery.data;
  const ingredients = ingredientsQuery.data;

  const [choosePizzaParams, setChoosePizzaParams] = useState({
    type: 1,
    size: 20,
  });

  useEffect(() => {
    if (pizza) {
      setChoosePizzaParams({
        type: pizza.type[0],
        size: pizza.size[0],
      });
    }
  }, [pizza]);

  if (!pizza || !ingredients || !toppings) return null;

  const ingredientsNames = ingredients
    .filter((ing) => pizza.ingredients.includes(ing.id))
    .map((i) => i.name)
    .join(", ");

  const handleChooseTopping = (topping: PizzaTopping) => {
    const ids = activeTopping.map((t) => t.id);
    if (ids.includes(topping.id)) {
      setActiveTopping(activeTopping.filter((i) => i.id !== topping.id));
    } else {
      setActiveTopping([...activeTopping, topping]);
    }
  };

  const calcPrice = () => {
    const basePrice = pizza.price;
    const toppingsPrice = activeTopping.reduce((acc, i) => acc + i.price, 0);

    return basePrice + toppingsPrice;
  };

  const selectedToppings = activeTopping.map((t) => t.name).join(", ");
  const typeTitle = choosePizzaParams.type === 1 ? "Традиционное" : "Тонкое";

  const handleAddToCart = () => {
    const pizzaParams = {
      name: pizza.name,
      imageUrl: pizza.imageUrl,
      price: calcPrice(),
      ingredients: ingredientsNames,
      toppings: selectedToppings,
      type: typeTitle,
      size: choosePizzaParams.size,
      quantity: 1,
    };

    addCartItem(pizzaParams);
    handleCloseModal();
  };

  return (
    <ModalWindow
      className={styles.modalWindow}
      setIsOpen={handleCloseModal}
      isOpen={selector.open}
    >
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

      <div className={styles.modal}>
        <div className={styles.imageContainer}>
          <img src={pizza.imageUrl} alt="" />
        </div>
        <section className={styles.body}>
          <header className={styles.header}>
            <h2 className={styles.title}>{pizza.name}</h2>
            <p
              className={styles.description}
            >{`${typeTitle} тесто, ${choosePizzaParams.size} см.`}</p>
            <p className={styles.ingredients}>{ingredientsNames}</p>
          </header>

          <section className={styles.params}>
            <div className={styles.selectors}>
              {pizza.size.map((size, index) => (
                <div
                  key={index}
                  className={`${styles.selector} ${
                    choosePizzaParams.size === size && styles.active
                  }`}
                  onClick={() =>
                    setChoosePizzaParams({ ...choosePizzaParams, size: size })
                  }
                >
                  {size} см
                </div>
              ))}
            </div>

            <div className={styles.selectors}>
              {pizza.type.map((type, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setChoosePizzaParams({ ...choosePizzaParams, type: type })
                  }
                  className={`${styles.selector} ${
                    choosePizzaParams.type === type && styles.active
                  }`}
                >
                  {type === 1 ? "Традиционное" : "Тонкое"}
                </div>
              ))}
            </div>
          </section>

          <section className={styles.toppingsSection}>
            <h3 className={styles.toppingsTitle}>Добавить по вкусу</h3>

            <ul className={styles.toppings}>
              {toppings.map((topping, index) => (
                <li
                  key={index}
                  className={`${styles.topping} ${
                    activeTopping.some((t) => t.id === topping.id) &&
                    styles.active
                  }`}
                  onClick={() => handleChooseTopping(topping)}
                >
                  {activeTopping.some((t) => t.id === topping.id) && (
                    <div className={styles.toppingCheck}>
                      <svg
                        width="7"
                        height="5"
                        viewBox="0 0 9 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.800011 4.0001L3.20001 6.4001L8.00001 1.6001"
                          stroke="#FE5F00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <img
                    className={styles.toppingImg}
                    src={topping.image}
                    alt="topping"
                  />
                  <p className={styles.toppingName}>{topping.name}</p>
                  <div className={styles.toppingPrice}>{topping.price} ₽</div>
                </li>
              ))}
            </ul>
          </section>
        </section>
        <div />
        <div className={styles.bottom}>
          <Button className={styles.bottomBtn} onClick={handleAddToCart}>
            В корзину за {calcPrice()} ₽
          </Button>
        </div>
      </div>
    </ModalWindow>
  );
};
