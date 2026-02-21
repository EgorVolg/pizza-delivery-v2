import { OrderSectionHeader } from "../OrderSectionHeader/OrderSectionHeader";
import styles from "./DeliveryAddressSection.module.css";
import timerIcon from "../../../../shared/assets/timer.svg";
import arrowBottom from "../../../../shared/assets/arrowbottom.svg";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FormData, FormErrors } from "../../ui/Orderpage";

const listVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    height: 120,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// Варианты для элементов списка
const itemVariants = {
  hidden: {
    opacity: 0,
    y: -5,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// Анимация стрелки
const arrowVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
};

// Анимация контейнера при тапе
const containerVariants = {
  idle: { scale: 1 },
  tap: { scale: 0.98 },
};

const times = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export const DeliveryAddressSection = ({
  formData,
  handleChange,
  handleDeliveryTimeChange,
  errors,
}: {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDeliveryTimeChange: (time: string) => void;
  errors: FormErrors;
}) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>(formData.deliveryTime || times[0]);

  // Синхронизация selectedTime с formData.deliveryTime при загрузке из localStorage
  useEffect(() => {
    if (formData.deliveryTime && times.includes(formData.deliveryTime)) {
      setSelectedTime(formData.deliveryTime);
    }
  }, [formData.deliveryTime]);

  const handleSelectTime = (time: string) => {
    handleDeliveryTimeChange(time);
    setSelectedTime(time);
    setOpenPopUp(false);
  };

  function handleOpenPopUp() {
    setOpenPopUp(!openPopUp);
  }

  return (
    <div className={styles.cart_items_section}>
      <OrderSectionHeader text="Адрес доставки" />
      <div className={styles.form_group_container}>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="name">
            Введите адрес
          </label>
          <input
            className={`${styles.form_input} ${errors.address ? styles.error : ""}`}
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <span className={styles.error_text}>{errors.address}</span>
          )}
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="surname">
            Комментарий к заказу
          </label>
          <textarea
            className={styles.form_area}
            id="Comment"
            placeholder="Укажите тут дополнительную информацию для курьера"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
        <div
          className={styles.delivery_time_container}
          id="delivery"
          onClick={handleOpenPopUp}
        >
          <motion.div
            variants={containerVariants}
            initial="idle"
            whileTap="tap"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <h5 className={styles.delivery_time}>Время доставки</h5>

            <div className={styles.delivery_time_text}>
              <img src={timerIcon} alt="timer" className={styles.timer_icon} />
              <span>{selectedTime}</span>

              <button
                className={styles.arrowBtn}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenPopUp();
                }}
              >
                <motion.img
                  src={arrowBottom}
                  alt="arrow"
                  className={styles.arrow_icon}
                  variants={arrowVariants}
                  animate={openPopUp ? "open" : "closed"}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </motion.div>

          <AnimatePresence>
            {openPopUp && (
              <motion.ul
                className={styles.delivery_time_list}
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {times.map((time) => (
                  <motion.li
                    key={time}
                    variants={itemVariants}
                    onClick={() => handleSelectTime(time)}
                    style={{
                      cursor: "pointer",
                      transition: "color 0.3s ease",
                    }}
                    whileHover={{
                      color: "var(--color-brand)",
                    }}
                  >
                    {time}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
