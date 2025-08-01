import type { Pizza } from "../../pages/Homepage";
import pizzaImage from "../ui/assests/pizza.avif";
import styles from "./Card.module.css";

export const Card = ({ pizza }: { pizza: Pizza }) => {
  return (
    <div className={styles.card}>
      <div className={styles.img_container}>
        <img src={pizzaImage} alt="Pizza" className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.info}> 
          <h2 className={styles.title}>{pizza.name}</h2>
          <p className={styles.description}>
            {pizza.description}
          </p>
        </div>

        <div className={styles.bottom_content}>
          <div className={styles.price}>от {pizza.price} $</div>
          <button className={styles.button}>+ Добавить</button>
        </div>
      </div>
    </div>
  );
};
