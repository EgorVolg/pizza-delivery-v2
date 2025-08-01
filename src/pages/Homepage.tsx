import Container from "../shared/components/Container";
import Header from "../shared/components/Header";
import TopBar from "../shared/components/TopBar";
import Button from "../shared/ui/Button";
import { Card } from "../shared/components/Card";
import styles from "./Homepage.module.css";
import FilterCheckbox from "../shared/ui/FilterCheckbox";

export interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
}

const pizzas = [
  {
    id: 1,
    name: "Margherita",
    description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
    price: 8.99,
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "Spicy pepperoni with mozzarella cheese on a tomato base.",
    price: 9.99,
  },
  {
    id: 3,
    name: "Vegetarian",
    description: "A mix of seasonal vegetables with mozzarella cheese.",
    price: 7.99,
  },
  {
    id: 4,
    name: "BBQ Chicken",
    description: "Grilled chicken with BBQ sauce, red onions, and cilantro.",
    price: 10.99,
  },
  {
    id: 5,
    name: "Hawaiian",
    description: "Ham and pineapple on a classic tomato base.",
    price: 9.49,
  },
  {
    id: 6,
    name: "Mushroom",
    description: "Mushrooms, mozzarella, and tomato sauce on a thin crust.",
    price: 8.99,
  },
  {
    id: 7,
    name: "Four Cheese",
    description: "A blend of four cheeses on a rich tomato base.",
    price: 11.99,
  },
  {
    id: 8,
    name: "Spicy Italian",
    description: "Spicy Italian sausage with peppers and onions.",
    price: 10.49,
  },
  {
    id: 9,
    name: "Seafood Delight",
    description: "Shrimp, calamari, and mussels on a garlic base.",
    price: 12.99,
  },
  {
    id: 10,
    name: "Pesto Veggie",
    description: "Pesto sauce with seasonal vegetables and mozzarella.",
    price: 9.49,
  },
];

const ingredients = [
  "Грибы",
  "Пепперони",
  "Сыр",
  "Оливки",
  "Базилик",
  "Перец",
  "Лук",
  "Курица",
];

export function Homepage() {
  return (
    <div className="body">
      <Header />
      <TopBar />

      <Container className={styles.main_container}>
        <main className={styles.main}>
          <div className={styles.filter_groups}>
            <h1 className={styles.filter_title}>Фильтрация</h1>
            <div className={styles.filter_group}>
              <FilterCheckbox text="Можно собирать" />
              <FilterCheckbox text="Новинки" />
            </div>

            <div className={styles.filter_group}>
              <p className={styles.filter_group_title}>Цена от и до:</p>
              <div className={styles.filter_price_sorting}>
                <div className={styles.input_container}>
                  <input
                    className={styles.price_input}
                    type="text"
                    placeholder="0"
                  />
                </div>
                <div className={styles.input_container}>
                  <input
                    className={styles.price_input}
                    type="text"
                    placeholder="100"
                  />
                </div>
              </div>
              {/* <input type="range" min="0" max="1000" /> */}
            </div>

            <div className={styles.filter_group}>
              <p className={styles.filter_group_title}>Ингредиенты:</p>
              <div>
                <ul>
                  {ingredients.map((ingredient) => (
                    <li key={ingredient}>
                      <FilterCheckbox text={ingredient} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.filter_group}>
                <p className={styles.filter_group_title}>Тип теста:</p>
                <FilterCheckbox text="Традиционное" rounded />
                <FilterCheckbox text="Толстое" rounded />
              </div>
            </div>
            <Button>Применить</Button>
          </div>

          <div className={styles.items_list}>
            {pizzas.map((pizza) => (
              <Card key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </main>
      </Container>
    </div>
  );
}
