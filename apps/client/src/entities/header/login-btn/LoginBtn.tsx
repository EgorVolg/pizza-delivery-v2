import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./LoginBtn.module.css";
import Button from "../../../shared/ui/Button/Button";
import { ProfilePopup } from "../profile-popup/ProfilePopup";

export const LoginBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = useCallback(() => setIsOpen((s) => !s), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent | MouseEvent) => {
      const target = e.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => setIsOpen(false);

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <div className={styles.profile_wrapper} ref={wrapperRef}>
      <Button className={styles.loginBtn} onClick={toggleMenu} aria-haspopup="menu" aria-expanded={isOpen} >
        <svg
          width="13"
          height="15"
          viewBox="0 0 13 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5706 14.2087V12.8198C11.5706 12.0831 11.2921 11.3765 10.7966 10.8556C10.301 10.3347 9.6288 10.042 8.92793 10.042H3.64264C2.94177 10.042 2.2696 10.3347 1.77401 10.8556C1.27842 11.3765 1 12.0831 1 12.8198V14.2087"
            stroke="#FE5F00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.28522 7.26405C7.74471 7.26405 8.92787 6.0204 8.92787 4.48627C8.92787 2.95215 7.74471 1.7085 6.28522 1.7085C4.82573 1.7085 3.64258 2.95215 3.64258 4.48627C3.64258 6.0204 4.82573 7.26405 6.28522 7.26405Z"
            stroke="#FE5F00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.login}>Войти</span>
      </Button>

      {/* ProfilePopup получает isOpen и функцию закрытия */}
      <ProfilePopup isOpen={isOpen} onClose={closeMenu} />
    </div>
  );
};
