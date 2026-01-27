import { Navigate, Route, Routes } from "react-router-dom";
import { ProductPage } from "../../pages/product/ui/ProductPage";
import { HomePage } from "../../pages/home/ui/HomePage";

export const AppRoutes = () => {
  return (
    <Routes>
      // Общая навигация
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path="/main" element={<HomePage />} />
      <Route
        path="/products/category/:categoryId/product/:productId"
        element={<ProductPage />}
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
  );
};
