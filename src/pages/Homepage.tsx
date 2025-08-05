import Container from "../shared/components/Container";
import Header from "../shared/components/Header";
import TopBar from "../shared/components/TopBar";
import { Card } from "../shared/components/Card";
import styles from "./Homepage.module.css";
import { Filters } from "../shared/components/Filters";

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
    description:
      "Бекон , цыпленок , ветчина , сыр блю чиз , сыры чеддер и пармезан , соус песто, кубики брынзы , томаты , красный лук , моцарелла, фирменный соус альфредо, чеснок , итальянские травы ",
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

export function Homepage() {
  return (
    <div className="body">
      <Header />
      <TopBar />

      <Container className={styles.main_container}>
        <main className={styles.main}>
          <div className={styles.navbar}>
            <Filters />
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
