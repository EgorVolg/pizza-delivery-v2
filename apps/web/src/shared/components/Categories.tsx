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

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newCategoryId: number
  ) => {
    event.preventDefault();
    setActiveCategoryId(newCategoryId);
  };

  return (
    <div className={styles.categories}>
      {categories.map((category, index) => (
        <a
          key={index}
          href="#"
          className={`${styles.category} ${
            activeCategoryId === index ? styles.active : ""
          }`}
          onClick={(event) => handleClick(event, index)}
        >
          {category}
        </a>
      ))}
    </div>
  );
}
