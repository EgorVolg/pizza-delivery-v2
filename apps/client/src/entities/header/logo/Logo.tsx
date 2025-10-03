import styles from "./Logo.module.css";
import logo from "../../../shared/assets/logo.svg";

export const Logo = () => {
  return (
    <div className={styles.logo_container}>
      <img className={styles.logo_image} src={logo} alt="logo"   />
      <div className={styles.logo_text}>
        <h1 className={styles.logo_title}>React Pizza</h1>
        <div className={styles.logo_description}>...more than just pizza</div>
      </div>
    </div>
  );
};
