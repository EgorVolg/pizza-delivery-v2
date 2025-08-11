import Container from "../shared/ui/Container";
import Header from "../shared/components/Header";
import TopBar from "../shared/components/TopBar";
import { Card } from "../shared/components/Card";
import styles from "./Homepage.module.css";
import { Filters } from "../shared/components/Filters";
import { useEffect, useState } from "react";
import { useScreenWidth } from "../shared/hooks/useScreen";
import { Footer } from "../shared/components/Footer";

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
  {
    id: 11,
    name: "BBQ Chicken",
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
    price: 10.99,
  },
  {
    id: 12,
    name: "Hawaiian",
    description: "Ham and pineapple on a classic tomato base.",
    price: 9.49,
  },
  {
    id: 13,
    name: "Mushroom",
    description: "Mushrooms, mozzarella, and tomato sauce on a thin crust.",
    price: 8.99,
  },
  {
    id: 14,
    name: "Four Cheese",
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
    price: 11.99,
  },
  {
    id: 15,
    name: "Spicy Italian",
    description: "Spicy Italian sausage with peppers and onions.",
    price: 10.49,
  },
  {
    id: 16,
    name: "Seafood Delight",
    description: "Shrimp, calamari, and mussels on a garlic base.",
    price: 12.99,
  },
  {
    id: 17,
    name: "Pesto Veggie",
    description: "Pesto sauce with seasonal vegetables and mozzarella.",
    price: 9.49,
  },
  {
    id: 18,
    name: "BBQ Chicken",
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
    price: 10.99,
  },
  {
    id: 19,
    name: "Hawaiian",
    description: "Ham and pineapple on a classic tomato base.",
    price: 9.49,
  },
  {
    id: 20,
    name: "Mushroom",
    description: "Mushrooms, mozzarella, and tomato sauce on a thin crust.",
    price: 8.99,
  },
  {
    id: 21,
    name: "Four Cheese",
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
    price: 11.99,
  },
  {
    id: 22,
    name: "Spicy Italian",
    description: "Spicy Italian sausage with peppers and onions.",
    price: 10.49,
  },
  {
    id: 23,
    name: "Seafood Delight",
    description: "Shrimp, calamari, and mussels on a garlic base.",
    price: 12.99,
  },
  {
    id: 24,
    name: "Pesto Veggie",
    description: "Pesto sauce with seasonal vegetables and mozzarella.",
    price: 9.49,
  },
];

export function Homepage() {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPizzas = pizzas.slice(indexOfFirstItem, indexOfLastItem);

  const screenWidth = useScreenWidth();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function toggleMenu() {
    setIsOpenFilters(!isOpenFilters);
  }

  return (
    <div>
      <Header />
      <TopBar toggleMenu={toggleMenu} />

      <Container className={styles.main_container}>
        <nav
          className={`${styles.navbar} ${
            isOpenFilters
              ? isOpenFilters || screenWidth >= 1024
                ? styles.visible
                : ""
              : ""
          }`}
        >
          <Filters toggleMenu={toggleMenu} isOpenFilters={isOpenFilters} />
        </nav>

        <main className={styles.main}>
          <div className={styles.items_list}>
            {currentPizzas.map((pizza) => (
              <Card key={pizza.id} pizza={pizza} />
            ))}
          </div>
          <Footer
            currentPage={currentPage}
            totalItems={pizzas.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </main>
      </Container>
    </div>
  );
}
