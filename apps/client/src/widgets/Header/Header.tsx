import styles from "./Header.module.css";
import logo from "../../shared/assets/logo.svg";
import Container from "../../shared/ui/Container/Container";
import { ProfilePopup } from "../../shared/components/ProfilePopup";
import { useState } from "react";
import { Search } from "../../pages/home/components/Search";
import Button from "../../shared/ui/Button/Button";
import CartBtn from "../../entities/cart/ui/CartBtn";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className={styles.header}>
      <Container className={styles.header_container}>
        <div className={styles.logo_container}>
          <img src={logo} alt="logo" width={35} height={35} />
          <div className={styles.logo_text}>
            <h1 className={styles.logo_title}>React Pizza</h1>
            <div className={styles.logo_description}>
              ...more than just pizza
            </div>
          </div>
        </div>

        <Container className={styles.search_container}>
          <Search />
        </Container>

        <div className={styles.buttons_group}>
          <ProfilePopup toggleMenu={toggleMenu} isOpen={isOpen} />
          <Button onClick={toggleMenu}>
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg SVG namespace SVG namespace   SVG namespace SVG namespace  "
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
          <CartBtn />
        </div>
      </Container>
    </header>
  );
}

export default Header;
