import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/utils/ProtectedRoute";

// Layout Components
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./components/Home";

// Admin Components
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import UpdateProduct from "./components/admin/UpdateProduct";
import NewProduct from "./components/admin/NewProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

// Cart Components
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/confirmOrder";
import OrderSuccess from "./components/cart/orderSuccess";
import StripeContainer from "./components/cart/StripeContainer";

// User Components
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";

// Product Components
import ProductDetails from "./components/products/productDetails";

// Order Components
import OrderDetails from "./components/orders/OrderDetails";
import ListOrders from "./components/orders/ListOrders";

// Load user
import { loadUser } from "./state/actions/userActions";
import store from "./state/Store";
import Profile from "./components/user/Profile";

// UI theme
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "./theme/theme";

function App() {
  const theme = useTheme();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Header />
          <div className="container container-fluid">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />

              <Route path="/login" element={<Login />} />

              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/users/reset-password/:token"
                element={<NewPassword />}
              />

              <Route
                path="/profile"
                element={<ProtectedRoute isAdmin={false} />}
              >
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route
                path="/update-profile"
                element={<ProtectedRoute isAdmin={false} />}
              >
                <Route path="/update-profile" element={<UpdateProfile />} />
              </Route>

              <Route
                path="/update-password"
                element={<ProtectedRoute isAdmin={false} />}
              >
                <Route path="/update-password" element={<UpdatePassword />} />
              </Route>

              <Route
                path="/orders"
                element={<ProtectedRoute isAdmin={false} />}
              >
                <Route path="/orders" element={<ListOrders />} />
              </Route>

              <Route
                path="/orders/:id"
                element={<ProtectedRoute isAdmin={false} />}
              >
                <Route path="/orders/:id" element={<OrderDetails />} />
              </Route>

              <Route
                path="/dashboard"
                element={<ProtectedRoute isAdmin={true} />}
              >
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              <Route
                path="/admin/products"
                element={<ProtectedRoute isAdmin={true} />}
              >
                <Route path="/admin/products" element={<ProductList />} />
              </Route>

              <Route
                path="/admin/products/:id"
                element={<ProtectedRoute isAdmin={true} />}
              >
                <Route path="/admin/products/:id" element={<UpdateProduct />} />
              </Route>

              <Route
                path="/admin/products/new"
                element={<ProtectedRoute isAdmin={true} />}
              >
                <Route path="/admin/products/new" element={<NewProduct />} />
              </Route>

              <Route
                path="/admin/orders"
                element={<ProtectedRoute isAdmin={true} />}
              >
                <Route path="/admin/orders" element={<OrdersList />} />
              </Route>

              <Route
                path="/admin/order/:id"
                element={<ProtectedRoute isAdmin={true} />}
              >
                <Route path="/admin/order/:id" element={<ProcessOrder />} />
              </Route>

              <Route
                path="/admin/users"
                element={<ProtectedRoute isAdmin={true} />}
              >
                <Route path="/admin/users" element={<UsersList />} />
              </Route>

              <Route
                path="/admin/user/:id"
                element={<ProtectedRoute isAdmin={true} />}
              >
                <Route path="/admin/user/:id" element={<UpdateUser />} />
              </Route>

              <Route
                path="/product/reviews"
                element={<ProtectedRoute isAdmin={true} />}
              >
                <Route path="/product/reviews" element={<ProductReviews />} />
              </Route>

              <Route path="/cart" element={<ProtectedRoute isAdmin={false} />}>
                <Route path="/cart" element={<Cart />} />
              </Route>

              <Route
                path="/shipping"
                element={<ProtectedRoute isAdmin={false} />}
              >
                <Route path="/shipping" element={<Shipping />} />
              </Route>

              <Route
                path="/confirm"
                element={<ProtectedRoute isAdmin={false} />}
              >
                <Route path="/confirm" element={<ConfirmOrder />} />
              </Route>

              <Route
                path="/payment"
                element={<ProtectedRoute isAdmin={false} />}
              >
                <Route path="/payment" element={<StripeContainer />} />
              </Route>

              <Route
                path="/success"
                element={<ProtectedRoute isAdmin={false} />}
              >
                <Route path="/success" element={<OrderSuccess />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
