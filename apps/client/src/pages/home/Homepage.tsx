import { useState } from "react";

import styles from "./Homepage.module.css";
import { useScreenWidth } from "../../shared/hooks/useScreen";
import Header from "../../widgets/Header/Header";
import TopBar from "../../shared/components/TopBar";
import Container from "../../shared/ui/Container/Container";
import { Filters } from "../../shared/components/Filters";
import { ProductCard } from "../../widgets/ProductsGrid/ProductCard/ProductCard";
import ProductCardSkeleton from "../../widgets/ProductsGrid/ProductCard/ProductCardSkeleton";
import { Footer } from "../../shared/components/Footer";
import { useGetPizzasQuery } from "../../entities/pizza/model/pizza.api";
import type { Pizza } from "../../entities/pizza/model/pizza.types";

export function Homepage() {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const screenWidth = useScreenWidth();
  const { isLoading, data: pizzas } = useGetPizzasQuery({});
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPizzas = pizzas?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function toggleMenu() {
    setIsOpenFilters(!isOpenFilters);
  }

  return (
    <>
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
            {isLoading || pizzas === undefined
              ? [...Array(6)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : currentPizzas?.map((pizza: Pizza) => (
                  <ProductCard key={pizza.id} pizza={pizza} />
                ))}
          </div>

          <Footer
            currentPage={currentPage}
            totalItems={pizzas?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </main>
      </Container>
    </>
  );
}
