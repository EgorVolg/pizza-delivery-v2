import Container from "../shared/components/Container";
import Header from "../shared/components/Header";
import TopBar from "../shared/components/TopBar";
import { Card } from "../shared/components/Card";
import styles from "./Homepage.module.css";
import { Filters } from "../shared/components/Filters";
import { useEffect, useState } from "react";

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
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
    price: 8.99,
  },
  {
    id: 2,
    name: "Pepperoni",
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
    price: 9.99,
  },
  {
    id: 3,
    name: "Vegetarian",
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
    price: 7.99,
  },
  {
    id: 4,
    name: "BBQ Chicken",
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
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
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
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
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (isOpenFilters) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpenFilters]);

  function toggleMenu() {
    setIsOpenFilters(!isOpenFilters);
  }

  return (
    <div>
      <Header />
      <TopBar />

      <Container className={styles.main_container}>
        <main className={styles.main}>
          {isOpenFilters || screenWidth > 1024 ? (
            <nav className={styles.navbar}>
              <Filters toggleMenu={toggleMenu} />
            </nav>
          ) : null}

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
