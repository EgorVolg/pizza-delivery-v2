import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProfilePopup.module.css";
import Xbtn from "../../../shared/ui/Xbtn/Xbtn";
import { Link } from "react-router-dom";

export const ProfilePopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          key="profile-popup"
          className={styles.user_menu_popup}
          role="menu"
          aria-hidden={!isOpen}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Xbtn onClick={onClose} className={styles.popup_close} />

          <Link to="/settings" onClick={onClose}>
            <li role="menuitem">Настройки</li>
          </Link>
          <Link to="/orders" onClick={onClose}>
            <li role="menuitem">Заказы</li>
          </Link>
          <Link to="/logout" onClick={onClose}>
            <li role="menuitem">Выйти</li>
          </Link>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
