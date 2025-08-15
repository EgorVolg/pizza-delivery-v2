import { useEffect, useRef } from "react";
import styles from "./ProfilePopup.module.css";

export const ProfilePopup = ({
  toggleMenu,
  isOpen,
}: {
  toggleMenu: () => void;
  isOpen: boolean;
}) => {
  const popupRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        toggleMenu();
      }
    };

    const handleScroll = () => toggleMenu();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, toggleMenu]);

  return (
    <ul
      ref={popupRef}
      className={`${styles.user_menu_popup} ${isOpen ? styles.visible : ""}`}
    >
      <li onClick={toggleMenu}>Настройки</li>
      <li onClick={toggleMenu}>Заказы</li>
      <li onClick={toggleMenu}>Выйти</li>
    </ul>
  );
};