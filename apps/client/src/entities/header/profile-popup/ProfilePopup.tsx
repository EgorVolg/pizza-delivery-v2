import { useEffect, useRef } from "react";
import styles from "./ProfilePopup.module.css";
import Xbtn from "../../../shared/ui/Xbtn/Xbtn";
import { Link } from "react-router-dom";

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
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
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
      <Xbtn onClick={toggleMenu} className={styles.popup_close} />

      <li onClick={toggleMenu}>
        <Link to={"/settings"}>Настройки</Link>
      </li>
      <li onClick={toggleMenu}>
        <Link to={"/orders"}>Заказы</Link>
      </li>
      <li onClick={toggleMenu}>
        <Link to={"/logout"}>Выйти</Link>
      </li>
    </ul>
  );
};
