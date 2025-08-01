import styles from "./TopBar.module.css";
import Container from "./Container";
import Categories from "./Categories";
import SortPopUp from "./SortPopup";

const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <Container className={styles.topbar_container}>
        <Categories />
        <SortPopUp />
      </Container>
    </div>
  );
};

export default TopBar;
