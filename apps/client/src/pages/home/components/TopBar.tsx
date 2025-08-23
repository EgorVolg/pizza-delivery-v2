import styles from "./TopBar.module.css";
import Container from "../../../shared/ui/Container/Container";
import Categories from "../../../entities/categories/ui/Categories";
import SortPopUp from "../../../shared/components/SortPopup";

const TopBar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <div className={styles.topbar}>
      <Container className={styles.topbar_container}>
        <Categories className={styles.categories} />
        <SortPopUp />

        <button className={styles.hamburger} onClick={toggleMenu}>
          <svg
            className={styles.hamburger_icon}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 -960 960 960"
            fill="#000"
          >
            <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
          </svg>
        </button>
      </Container>
    </div>
  );
};

export default TopBar;
