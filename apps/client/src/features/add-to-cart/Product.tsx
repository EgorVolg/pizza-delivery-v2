import { useEffect, useState } from "react";
import Button from "../../shared/ui/Button/Button";
import styles from "./PizzaModalWindow.module.css";
import { useGetPizzaToppingsQuery } from "../../entities/products/model/pizzatoppings.api";
import { useGetCoffeeToppingsQuery } from "../../entities/products/model/coffeetoppings.api";
import { useAddCartItemMutation } from "../../entities/cart/model/cart.api";
import type { Topping } from "../../entities/products/model/pizza.types";
import { useGetProductByIdQuery } from "../../entities/products/model/products.api";
import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { typesOfDough } from "../../widgets/Filters/model/filter.const";
import Xbtn from "../../shared/ui/Xbtn/Xbtn";

interface ChoosePizzaParams {
  type: number | string | null;
  size: number | string | null;
  weight?: number | null;
  quantity?: number | null;
}

export const Product = ({
  isMobile,
  handleCloseModal,
}: {
  isMobile: boolean;
  handleCloseModal: () => void;
}) => {
  const { data: pizzaToppings } = useGetPizzaToppingsQuery();
  const { data: coffeeToppings } = useGetCoffeeToppingsQuery();
  const [addCartItem] = useAddCartItemMutation();
  const [activeTopping, setActiveTopping] = useState([] as Topping[]);

  const selector = useSelector((state: RootState) => state.pizzaModal);

  const queryParams = { id: selector.id, categoryId: selector.categoryId };
  const { data: pizza } = useGetProductByIdQuery(queryParams);
  const ingredientsQuery = useGetIngredientsQuery();
  const ingredients = ingredientsQuery.data;

  const [choosePizzaParams, setChoosePizzaParams] = useState<ChoosePizzaParams>(
    { type: null, size: null, weight: null, quantity: null },
  );

  useEffect(() => {
    if (!pizza) return;

    setChoosePizzaParams({
      type: pizza.type !== null ? pizza.type[0] : null,
      size: pizza.size !== null ? pizza.size[0] : null,
      weight: pizza.weight !== null ? pizza.weight[0].toString() : null,
      quantity: pizza.quantity !== null ? pizza.quantity[0] : null,
    });
  }, [pizza]);

  if (!pizza || !ingredients) return null;

  const ingredientsNames =
    pizza.ingredients &&
    ingredients
      .filter((ing) => pizza.ingredients.includes(ing.id))
      .map((i) => i.name)
      .join(", ");

  const handleChooseTopping = (topping: Topping) => {
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
  const typeTitle = pizza.type
    ? typesOfDough.find((t) => t.id === choosePizzaParams.type)?.name
    : null;

  const handleAddToCart = () => {
    const pizzaParams = {
      id: pizza.id,
      cart_id: "550e8400-e29b-41d4-a716-446655440000",
      name: pizza.name,
      imageUrl: pizza.imageUrl,
      price: calcPrice(),
      ingredients: ingredientsNames,
      toppings: selectedToppings,
      productQuantity: (choosePizzaParams.quantity || 1).toString(),
      type: typeTitle,
      weight:
        choosePizzaParams.weight &&
        choosePizzaParams.weight.toString() +
          `${
            pizza.category_id === 4 ||
            pizza.category_id === 5 ||
            pizza.category_id === 7
              ? " л."
              : " гр."
          }`,
      size: choosePizzaParams.size,
      quantity: 1,
    };

    addCartItem(pizzaParams);
    handleCloseModal();
  };

  if (!pizzaToppings || !coffeeToppings) return null;
  const categoryId = Number(pizza.category_id);

  const toppings =
    categoryId === 1 || categoryId === 2
      ? pizzaToppings
      : categoryId === 5
        ? coffeeToppings
        : null;

  return (
    <>
      {!isMobile && (
        <Xbtn className={styles.xbtnContainer} onClick={handleCloseModal} />
      )}

      <div className={styles.modal}>
        <div className={styles.imageContainer}>
          <img src={pizza.imageUrl} alt="Pizza image" />
        </div>
        <section className={styles.body}>
          <header className={styles.header}>
            <h2 className={styles.title}>{pizza.name}</h2>
            <div>
              {choosePizzaParams.type !== null && `${typeTitle + " тесто, "}`}

              {choosePizzaParams.size !== null &&
                `${choosePizzaParams.size + " см "}`}

              {pizza.quantity !== null &&
                choosePizzaParams.quantity +
                  `${isNaN(+choosePizzaParams.quantity) ? ", " : "шт.,"}  `}

              {choosePizzaParams.weight !== null &&
                (pizza.category_id === 5 ||
                pizza.category_id === 4 ||
                pizza.category_id === 7
                  ? `${choosePizzaParams.weight + "л."} `
                  : `${choosePizzaParams.weight + "гр."} `)}

              <div className={styles.params}>
                {choosePizzaParams.quantity !== null && (
                  <div className={styles.selectors}>
                    {pizza.quantity !== null &&
                      pizza.quantity.map((item, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            setChoosePizzaParams({
                              ...choosePizzaParams,
                              quantity: item,
                              weight: pizza.weight && pizza.weight[index],
                            })
                          }
                          className={`${styles.selector} ${
                            choosePizzaParams.quantity === item && styles.active
                          }`}
                        >
                          {item}
                          {isNaN(+choosePizzaParams.quantity) ? " " : "шт."}
                        </div>
                      ))}
                  </div>
                )}

                {choosePizzaParams.weight !== null &&
                  (pizza.category_id === 5 ||
                    pizza.category_id === 4 ||
                    pizza.category_id === 7) && (
                    <div className={styles.selectors}>
                      {pizza.weight !== null &&
                        pizza.weight.map((item, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              setChoosePizzaParams({
                                ...choosePizzaParams,
                                weight: pizza.weight && pizza.weight[index],
                              })
                            }
                            className={`${styles.selector} ${
                              +choosePizzaParams.weight === +item &&
                              styles.active
                            }`}
                          >
                            {item} л.
                          </div>
                        ))}
                    </div>
                  )}
              </div>
            </div>
            {/* <p className={styles.ingredients}>
              {ingredientsNames ? ingredientsNames : pizza.description}
            </p> */}
          </header>

          <section className={styles.params}>
            {pizza.size !== null && (
              <div className={styles.selectors}>
                {pizza.size.map((size, index) => (
                  <div
                    key={index}
                    className={`${styles.selector} ${
                      choosePizzaParams.size === size && styles.active
                    }`}
                    onClick={() =>
                      setChoosePizzaParams({
                        ...choosePizzaParams,
                        size: size,
                      })
                    }
                  >
                    {size} см
                  </div>
                ))}
              </div>
            )}

            {choosePizzaParams.type !== null && (
              <div className={styles.selectors}>
                {pizza.type.map((type, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setChoosePizzaParams({
                        ...choosePizzaParams,
                        type: type,
                      })
                    }
                    className={`${styles.selector} ${
                      choosePizzaParams.type === type && styles.active
                    }`}
                  >
                    {typesOfDough.find((t) => t.id === type)?.name}
                  </div>
                ))}
              </div>
            )}
          </section>

          {toppings && (
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
                      src={topping.imageUrl}
                      alt="topping"
                    />
                    <p className={styles.toppingName}>{topping.name}</p>
                    <div className={styles.toppingPrice}>{topping.price} ₽</div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
        <div />
        <div className={styles.bottom}>
          <Button className={styles.bottomBtn} onClick={handleAddToCart}>
            В корзину за {calcPrice()} ₽
          </Button>
        </div>
      </div>
    </>
  );
};
