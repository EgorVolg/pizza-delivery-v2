import styles from "./ProfilePopup.module.css";

export const ProfilePopup = ({
  toggleMenu,
  isOpen,
}: {
  toggleMenu: () => void;
  isOpen: boolean;
}) => {
  return (
    <ul className={styles.user_menu_popup + " " + (isOpen && styles.visible)}>
      <li onClick={toggleMenu}>Настройки</li>
      <li onClick={toggleMenu}>Заказы</li>
      <li onClick={toggleMenu}>Выйти</li>
    </ul>
  );
};
