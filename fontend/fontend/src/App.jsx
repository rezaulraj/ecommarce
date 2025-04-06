import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import HomePage from "./pages/homepage/HomePage";
import Footer from "./component/Footer";
import Login from "./component/Login";
import MainLayout from "./component/admin-layout/MainLayout";
import Dashboard from "./pages/homepage/admin-penal/Dashboard";
import ProtectedRoute from "./component/admin-layout/admin-secure/ProtectedRoute";
import CustomerOrderPage from "./pages/homepage/admin-penal/CustomerOrderPage";
import OrderPage from "./pages/homepage/admin-penal/OrderPage";
import CreateProduct from "./pages/homepage/admin-penal/CreateProduct";
import Products from "./pages/homepage/admin-penal/Products";
import NotFoundPage from "./component/NotFoundPage";
import SignUp from "./component/SignUp";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useUserStore } from "./component/stores/useUserStore";
import LoadingSpinner from "./component/LoadingSpinner";
import Category from "./pages/homepage/admin-penal/Category";

function App() {
  const { checkAuth, checkingAuth, user } = useUserStore();
  // const userRole = user?.role === "admin";
  const userRole = user?.role;
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            !user ? (
              <div>
                <Header />
                <Login />
              </div>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            !user ? (
              <div>
                <Header />
                <SignUp />
              </div>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/"
          element={
            <div>
              <Header />
              <HomePage />
              <Footer />
            </div>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          element={
            <ProtectedRoute
              userRole={userRole}
              requiredRole="admin"
              redirectPath="/login"
            />
          }
        >
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />{" "}
            {/* Default route for /admin */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="customer/:orderId?" element={<CustomerOrderPage />} />
            <Route path="product" element={<CreateProduct />} />
            <Route path="products" element={<Products />} />
            <Route path="category" element={<Category />} />
            {/* Relative path */}
            {/* Add more admin routes here */}
          </Route>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
