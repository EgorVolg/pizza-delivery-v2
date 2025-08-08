import { useState } from "react";
import styles from "./Categories.module.css";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Сладкие",
  "Острые",
  "С курицей",
];
export default function CategoriesList() {
  const [activeCategoryId, setActiveCategoryId] = useState(0);

  const handleClick = (newCategoryId: number) =>
    setActiveCategoryId(newCategoryId);

  return (
    <div className={styles.categories}>
      {categories.map((category, index) => (
        <a
          key={index}
          href="#"
          className={`${styles.category} ${
            activeCategoryId === index ? styles.active : ""
          }`}
          onClick={() => handleClick(index)}
        >
          {category}
        </a>
      ))}
    </div>
  );
}
