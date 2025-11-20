import { Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "../pages/home/ui/Homepage";
import Container from "../shared/ui/Container/Container";
import Header from "../widgets/Header/ui/Header";
import styles from "./styles/App.module.css";
import { Productpage } from "../pages/product/ui/Productpage";

function App() {
  return (
    <div className={styles.app}>
      <Container className={styles.container}>
        <Header />
        <Routes>
          // Общая навигация
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<Homepage />} />
          <Route
            path="/pizza/category/:categoryId/product/:productId"
            element={<Productpage />}
          />
          // Авторизация
          <Route path="/sign-in" element={<div>Login</div>} />
          <Route path="/sign-up" element={<div>Registration</div>} />
          // Прочее
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/settings" element={<div>Settings</div>} />
          <Route path="/orders" element={<div>Orders</div>} />
          <Route path="/logout" element={<div>Logout</div>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
