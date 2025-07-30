import styles from "./Header.module.css";
import Button from "./ui/button";
import logo from "./ui/assests/logo.svg";
import { useEffect, useState } from "react";

function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.main_container}>
        <div className={styles.logo_container}>
          <img src={logo} alt="logo" width={35} height={35} />
          <div>
            {!isMobile && (
              <>
                <h1 className={styles.logo_title}>Pizza Delivery</h1>
                <div className={styles.logo_description}>
                  Fastest delivery in town
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.input}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.48674 5.25469e-09C7.69591 -4.8654e-05 8.88103 0.337848 9.90836 0.975558C10.9357 1.61327 11.7643 2.52541 12.3008 3.60904C12.8372 4.69267 13.0601 5.90466 12.9443 7.10823C12.8284 8.31181 12.3785 9.45905 11.6453 10.4205L15.7477 14.5245C15.9028 14.6802 15.9929 14.889 15.9996 15.1087C16.0063 15.3283 15.9292 15.5423 15.7838 15.7071C15.6385 15.8719 15.4358 15.9753 15.2171 15.9961C14.9983 16.0169 14.7798 15.9537 14.606 15.8193L14.5247 15.7475L10.4205 11.6452C9.60141 12.2698 8.64535 12.6903 7.63144 12.872C6.61754 13.0537 5.57494 12.9914 4.58992 12.6901C3.60489 12.3889 2.70577 11.8574 1.96693 11.1397C1.2281 10.422 0.670807 9.53868 0.341162 8.56283C0.0115182 7.58698 -0.0809972 6.54665 0.0712713 5.52795C0.22354 4.50924 0.616214 3.54143 1.2168 2.70462C1.81739 1.8678 2.60863 1.18602 3.52504 0.715706C4.44145 0.24539 5.45668 5.43643e-05 6.48674 5.25469e-09ZM6.48674 1.72983C5.22505 1.72983 4.01504 2.23102 3.1229 3.12314C2.23075 4.01525 1.72955 5.22522 1.72955 6.48687C1.72955 7.74851 2.23075 8.95849 3.1229 9.8506C4.01504 10.7427 5.22505 11.2439 6.48674 11.2439C7.74843 11.2439 8.95844 10.7427 9.85058 9.8506C10.7427 8.95849 11.2439 7.74851 11.2439 6.48687C11.2439 5.22522 10.7427 4.01525 9.85058 3.12314C8.95844 2.23102 7.74843 1.72983 6.48674 1.72983Z"
              fill="#ADADAD"
            />
          </svg>

          <input
            type="text"
            placeholder="Поиск пиццы..."
            className={styles.search_input}
          />
        </div>

        <div className={styles.buttons_group}>
          <Button>
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.28522 7.26405C7.74471 7.26405 8.92787 6.0204 8.92787 4.48627C8.92787 2.95215 7.74471 1.7085 6.28522 1.7085C4.82573 1.7085 3.64258 2.95215 3.64258 4.48627C3.64258 6.0204 4.82573 7.26405 6.28522 7.26405Z"
                stroke="#FE5F00"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {!isMobile && "Войти"}
          </Button>

          <Button>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3332C7.06971 16.3332 7.66667 15.7362 7.66667 14.9998C7.66667 14.2635 7.06971 13.6665 6.33333 13.6665C5.59695 13.6665 5 14.2635 5 14.9998C5 15.7362 5.59695 16.3332 6.33333 16.3332Z"
                stroke="#FE5F00"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.3333 16.3332C15.0697 16.3332 15.6667 15.7362 15.6667 14.9998C15.6667 14.2635 15.0697 13.6665 14.3333 13.6665C13.597 13.6665 13 14.2635 13 14.9998C13 15.7362 13.597 16.3332 14.3333 16.3332Z"
                stroke="#FE5F00"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.77984 4.99984H16.3332L15.2132 10.5932C15.1522 10.9001 14.9852 11.1758 14.7415 11.372C14.4977 11.5683 14.1927 11.6725 13.8798 11.6665H6.83317C6.50763 11.6693 6.19232 11.5528 5.94671 11.3391C5.70109 11.1255 5.54215 10.8293 5.49984 10.5065L4.4865 2.8265C4.44448 2.50599 4.28745 2.21167 4.04464 1.99828C3.80182 1.7849 3.48976 1.66699 3.1665 1.6665H1.6665"
                stroke="#FE5F00"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
