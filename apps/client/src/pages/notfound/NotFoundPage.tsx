import styles from "./NotFoundPage.module.css";
import error404Img from "./../../shared/assets/error404.svg";
import { ArrowRight } from "../../shared/ui/ArrowRight";
import Button from "../../shared/ui/Button/Button";
import Container from "../../shared/ui/Container/Container";

export const NotFoundPage = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.notFoundPage}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Страница не найдена</h1>
          <p className={styles.text}>
            Проверьте корректность введённого адреса или повторите попытку позже
          </p>

          <div className={styles.btn_container}>
            <Button className={styles.btn_back}>
              <ArrowRight className={styles.arrow} />
              На главную
            </Button>
            <Button className={styles.btn_refresh}>Обновить</Button>
          </div>
        </div>
        <img className={styles.img} src={error404Img} alt="Page not found" />
      </div>
    </Container>
  );
};
