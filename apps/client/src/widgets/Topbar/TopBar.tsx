import styles from "./TopBar.module.css";
import Container from "../../shared/ui/Container/Container";
import CategoriesList from "../../entities/topbar/categories/ui/Categories";
import { SortPopUp } from "../../entities/topbar/sort-popup/ui/SortPopup";
import { useGetCategoriesQuery } from "../../entities/topbar/categories/model/categories.api";
import { useEffect, useState } from "react";
import ArrowCategoriesDropDown from "../../shared/assets/arrow_drop_down.svg";

export const TopBar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const [isWide, setIsWide] = useState(window.innerWidth > 480);
  const { isLoading } = useGetCategoriesQuery();

  const [showCategories, setShowCategories] = useState(true);
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const [openSortPopup, setOpenSortPopup] = useState(false);

  const toggleSortPopup = () => setOpenSortPopup(!openSortPopup);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
    setIsArrowRotated(!isArrowRotated);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 480);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.topbar}>
      <Container className={styles.topbar_container}>
        <CategoriesList showCategories={showCategories}   isWide={isWide}/>

        {isLoading ? (
          <>
            <div className={styles.loaderPopUp} />
            <div className={styles.loaderFiltersBtn} />
          </>
        ) : (
          <>
            <SortPopUp
              toggleSortPopup={toggleSortPopup}
              openSortPopup={openSortPopup}
            />

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

            <button
              className={`${styles.showCategoriesBtn} ${
                isArrowRotated ? styles.rotated : ""
              }`}
              onClick={toggleCategories}
            >
              <img src={ArrowCategoriesDropDown} alt="arrow" />
            </button>
          </>
        )}
      </Container>
    </div>
  );
};
