import styles from "./Header.module.css";
import Container from "../../../shared/ui/Container/Container";

import { CartBtn } from "../../../entities/header/card-btn/CartBtn";
import { Logo } from "../../../entities/header/logo/Logo";
import { Search } from "../../../entities/header/search-input/Search/Search";
import { Link } from "react-router-dom";
import { LoginBtn } from "../../../entities/header/login-btn/LoginBtn";

function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.header_container}>
        <Link to="/main" className={styles.logo_link}>
          <Logo />
        </Link>

        <Search />

        <div className={styles.buttons_group}>
          <LoginBtn />
          <CartBtn />
        </div>
      </Container>
    </header>
  );
}

export default Header;
