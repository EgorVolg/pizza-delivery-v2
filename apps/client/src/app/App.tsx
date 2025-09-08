import { Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "../pages/home/ui/Homepage";
import Container from "../shared/ui/Container/Container";
import Header from "../widgets/Header/ui/Header";
import styles from "./styles/App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Container className={styles.container}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<Homepage />} />
          <Route path="/settings" element={<div>Settings</div>} />
          <Route path="/orders" element={<div>Orders</div>} />
          <Route path="/logout" element={<div>Logout</div>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
