import { Homepage } from "../pages/home/ui/Homepage";
import Container from "../shared/ui/Container/Container";
import Header from "../widgets/Header/ui/Header";
import styles from "./styles/App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Container className={styles.container}>
        <Header />
        <Homepage />
      </Container>
    </div>
  );
}

export default App;
