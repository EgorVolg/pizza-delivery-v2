import styles from "./Search.module.css";
import pizzaImage from "./../ui/assests/pizza.avif";
import { Input } from "./Input";

const searchVariants = [
  {
    id: 1,
    name: "Margherita",
    imageUrl: pizzaImage,
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
    price: 8.99,
  },
  {
    id: 2,
    name: "Pepperoni",
    imageUrl: pizzaImage,
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
    price: 9.99,
  },
  {
    id: 3,
    name: "Vegetarian",
    imageUrl: pizzaImage,
    description:
      "Four cheeses (mozzarella, cheddar, provolone, and parmesan) on a classic tomato base.",
    price: 7.99,
  },
];

export const Search = ({
  inputRef,
  focused,
  setFocused,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {focused && <div className={styles.overlay} />}

      <Input inputRef={inputRef} setFocused={setFocused} />

      {focused && (
        <ul className={styles.dropdown}>
          {searchVariants.map((p) => (
            <li key={p.id} className={styles.item}>
              <div className={styles.img_container}>
                <img src={p.imageUrl} alt={p.name} className={styles.img} />
              </div>

              <span className={styles.name}>{p.name}</span>
              <b className={styles.price}>{p.price} ₽</b>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
