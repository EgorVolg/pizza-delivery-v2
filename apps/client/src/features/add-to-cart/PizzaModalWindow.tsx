import { useDispatch, useSelector } from "react-redux";
import styles from "./PizzaModalWindow.module.css";
import { useProcessedPizzas } from "../homepage/model/useProcessedPizzas";
import Button from "../../shared/ui/Button/Button";
import type {
  PizzaAPI,
  PizzaTopping,
} from "../../entities/pizza/model/pizza.types";
import { useState, useEffect } from "react";
import { useGetPizzaToppingsQuery } from "../../entities/pizza/model/pizzatoppings.api";
import { useAddCartItemMutation } from "../../entities/cart/model/cart.api";
import type { RootState } from "../../app/store";
import { ModalWindow } from "../../shared/ui/ModalWindow/ModalWindow";

export const PizzaModalWindow = () => {
  const dispatch = useDispatch();
  const { data: toppings } = useGetPizzaToppingsQuery();
  const [addCartItem] = useAddCartItemMutation();

  const [activeTopping, setActiveTopping] = useState([] as PizzaTopping[]);

  const selector = useSelector((s: RootState) => s.pizzaModal);

  const pizzas = useProcessedPizzas();
  const activeId = selector.id;
  const pizza = pizzas.data.find((p) => p.id === activeId) as
    | PizzaAPI
    | undefined;

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

  if (!pizza) return null;

  const handleClose = () => {
    dispatch({
      type: "pizzaModal/setOpenClosePizzaModal",
      payload: { open: false },
    });
  };

  const handleChooseTopping = (topping: PizzaTopping) => {
    const ids = activeTopping.map((t) => t.id);
    if (ids.includes(topping.id)) {
      setActiveTopping(activeTopping.filter((i) => i.id !== topping.id));
    } else {
      setActiveTopping([...activeTopping, topping]);
    }
  };

  if (!toppings) return null;
  const calcPrice = () => {
    const basePrice = pizza.price;

    const toppingsPrice = activeTopping.reduce((acc, i) => acc + i.price, 0);

    return basePrice + toppingsPrice;
  };

  const selectedToppings = activeTopping.map((t) => t.name).join(", ");

  const handleAddToCart = () => {
    const pizzaParams = {
      name: pizza.name,
      imageUrl: pizza.imageUrl,
      price: calcPrice(),
      ingredients: pizza.ingredients,
      toppings: selectedToppings,
      type: choosePizzaParams.type,
      size: choosePizzaParams.size,
      quantity: 1,
    };

    addCartItem(pizzaParams);
    handleClose();
  };

  return (
   
    <ModalWindow
      className={styles.modalWindow}
      setIsOpen={handleClose}
      isOpen={selector.open}
      onClose={handleClose}
    >
      <div className={styles.modal}>
        <div className={styles.imageContainer}>
          <img src={pizza.imageUrl} alt="" />
        </div>
        <section className={styles.body}>
          <header className={styles.header}>
            <h2 className={styles.title}>{pizza.name}</h2>
            <p
              className={styles.description}
            >{`${choosePizzaParams.type} тесто, ${choosePizzaParams.size} см.`}</p>
            <p className={styles.ingredients}>{pizza.ingredients}</p>
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
                  {type}
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
