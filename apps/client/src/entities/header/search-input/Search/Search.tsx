import { useEffect, useRef, useState } from "react"; 
import { useLockScroll } from "../../../../shared/hooks/useLockScroll";
import styles from "./Search.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { InputSkeleton } from "../../../../shared/ui/Input/ui/Input.Skeleton";
import { Input } from "../../../../shared/ui/Input/Input";
import { Link } from "react-router-dom";
import Xbtn from "../../../../shared/ui/Xbtn/Xbtn";
import { Overlay } from "../../../../shared/ui/Overlay/Overlay";
import Container from "../../../../shared/ui/Container/Container";
import { useGetProductsQuery } from "../../../pizza/model/products.api";

// Enhanced dropdown animation variants
const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.95,
  },
};

// Animation variants for dropdown items
const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

// Animation variants for the search icon
const iconVariants = {
  idle: {
    scale: 1,
    rotate: 0,
  },
  active: {
    scale: 1.1,
    rotate: 360,
  },
};

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: pizzas, isLoading } = useGetProductsQuery();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused) {
      inputRef.current?.focus();
    }
  }, [focused]);

  useLockScroll(focused);

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.trim()})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) => (
      <span key={index} className={index % 2 === 1 ? styles.highlightSpan : ""}>
        {part}
      </span>
    ));
  };

  const searchVariants = pizzas?.filter((p) =>
    p.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim())
  );

  return (
    <Container className={styles.search_container}>
      {focused && <Overlay onClick={() => setFocused(false)} />}

      <motion.div
        className={styles.input_icon}
        variants={iconVariants}
        animate={focused ? "active" : "idle"}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          onClick={() => setFocused(true)}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#ADADAD"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.48674 5.25469e-09C7.69591 -4.8654e-05 8.88103 0.337848 9.90836 0.975558C10.9357 1.61327 11.7643 2.52541 12.3008 3.60904C12.8372 4.69267 13.0601 5.90466 12.9443 7.10823C12.8284 8.31181 12.3785 9.45905 11.6453 10.4205L15.7477 14.5245C15.9028 14.6802 15.9929 14.889 15.9996 15.1087C16.0063 15.3283 15.9292 15.5423 15.7838 15.7071C15.6385 15.8719 15.4358 15.9753 15.2171 15.9961C14.9983 16.0169 14.7798 15.9537 14.606 15.8193L14.5247 15.7475L10.4205 11.6452C9.60141 12.2698 8.64535 12.6903 7.63144 12.872C6.61754 13.0537 5.57494 12.9914 4.58992 12.6901C3.60489 12.3889 2.70577 11.8574 1.96693 11.1397C1.2281 10.422 0.670807 9.53868 0.341162 8.56283C0.0115182 7.58698 -0.0809972 6.54665 0.0712713 5.52795C0.22354 4.50924 0.616214 3.54143 1.2168 2.70462C1.81739 1.8678 2.60863 1.18602 3.52504 0.715706C4.44145 0.24539 5.45668 5.43643e-05 6.48674 5.25469e-09ZM6.48674 1.72983C5.22505 1.72983 4.01504 2.23102 3.1229 3.12314C2.23075 4.01525 1.72955 5.22522 1.72955 6.48687C1.72955 7.74851 2.23075 8.95849 3.1229 9.8506C4.01504 10.7427 5.22505 11.2439 6.48674 11.2439C7.74843 11.2439 8.95844 10.7427 9.85058 9.8506C10.7427 8.95849 11.2439 7.74851 11.2439 6.48687C11.2439 5.22522 10.7427 4.01525 9.85058 3.12314C8.95844 2.23102 7.74843 1.72983 6.48674 1.72983Z" />
        </motion.svg>
      </motion.div>
      {isLoading ? (
        <InputSkeleton />
      ) : (
        <>
          <Input
            className={styles.input}
            isLoading={isLoading}
            ref={inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={() => {
              setFocused(false), setSearchValue("");
            }}
            onFocus={() => setFocused(true)}
            placeholder="Поиск пиццы..."
          />

          {searchValue && (
            <Xbtn className={styles.xbtn} onClick={() => setSearchValue("")} />
          )}

          <AnimatePresence>
            {focused && (
              <motion.ul
                className={styles.dropdown}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                  staggerChildren: 0.05,
                }}
              >
                {searchVariants?.length === 0 ? (
                  <motion.span
                    className={styles.not_found}
                    variants={itemVariants}
                    transition={{ duration: 0.2 }}
                  >
                    Ничего не найдено
                  </motion.span>
                ) : (
                  searchVariants?.map((p) => (
                    <motion.div
                      key={p.id}
                      variants={itemVariants}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={`/pizza/${p.id}`}
                        onClick={() => setSearchValue("")}
                      >
                        <li className={styles.item}>
                          <div className={styles.img_container}>
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              className={styles.img}
                            />
                          </div>
                          <span className={styles.info}>
                            {highlightMatch(p.name, searchValue)}

                            <b className={styles.price}>{p.price} ₽</b>
                          </span>
                        </li>
                      </Link>
                    </motion.div>
                  ))
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}
    </Container>
  );
};
