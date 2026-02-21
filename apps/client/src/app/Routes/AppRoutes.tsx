import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PageLoader } from "../../shared/ui/PageLoader/PageLoader";

// Ленивая загрузка страниц
const HomePage = lazy(() =>
  import("../../pages/home/ui/Homepage").then((module) => ({
    default: module.HomePage,
  }))
);

const ProductPage = lazy(() =>
  import("../../pages/product/ui/Productpage").then((module) => ({
    default: module.ProductPage,
  }))
);

const Orderpage = lazy(() =>
  import("../../pages/order/ui/Orderpage").then((module) => ({
    default: module.Orderpage,
  }))
);

const NotFoundPage = lazy(() =>
  import("../../pages/notfound/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  }))
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Общая навигация */}
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="/main" element={<HomePage />} />
        <Route
          path="/products/category/:categoryId/product/:productId"
          element={<ProductPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
        {/* Авторизация */}
        <Route path="/sign-in" element={<div>Login</div>} />
        <Route path="/sign-up" element={<div>Registration</div>} />
        {/* Прочее */}
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/orders" element={<div>Orders</div>} />
        <Route path="/order" element={<Orderpage />} />
        <Route path="/logout" element={<div>Logout</div>} />
      </Routes>
    </Suspense>
  );
};
