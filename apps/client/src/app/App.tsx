import { Homepage } from "../pages/home/Homepage";
import Container from "../shared/ui/Container/Container";
import styles from "./styles/App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <Container className={styles.container}>
          <Homepage />
        </Container>
      </div>
    </div>
  );
}

export default App;
