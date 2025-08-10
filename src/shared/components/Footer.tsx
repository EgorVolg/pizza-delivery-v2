import React from "react";
import styles from "./Footer.module.css";

interface FooterProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${
            currentPage === i ? styles.active : ""
          }`}
          onClick={() => onPageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.buttons_container}>
        <button
          className={styles.navButton}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          {"←"}
        </button>

        {renderPageNumbers()}

        <button
          className={styles.navButton}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          {"→"}
        </button>
      </div>

      <div className={styles.pageInfo}>
        {startItem}-{endItem} из {totalItems}
      </div>
    </footer>
  );
};
