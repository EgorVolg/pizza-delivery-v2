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
export default function Categories() {
  const [activeId, setActiveId] = useState(0);

  const handleCategoryClick = (index: number) => {
    setActiveId(index);
  };
  return (
    <div className={styles.categories}>
      {categories.map((category, index) => (
        <a
          key={index}
          href="#"
          className={`${styles.category} ${
            activeId === index ? styles.active : ""
          }`}
          onClick={() => handleCategoryClick(index)}
        >
          {category}
        </a>
      ))}
    </div>
  );
} 
