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

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/register" element={<Register />} exact />

            <Route path="/login" element={<Login />} exact />

            <Route path="/products/:id" element={<ProductDetails />} exact />
            <Route path="/forgot-password" element={<ForgotPassword />} exact />
            <Route
              path="/users/reset-password/:token"
              element={<NewPassword />}
              exact
            />

            <Route
              path="/profile"
              element={<ProtectedRoute isAdmin={false} />}
              exact
            >
              <Route path="/profile" element={<Profile />} exact />
            </Route>

            <Route
              path="/update-profile"
              element={<ProtectedRoute isAdmin={false} />}
              exact
            >
              <Route path="/update-profile" element={<UpdateProfile />} exact />
            </Route>

            <Route
              path="/update-password"
              element={<ProtectedRoute isAdmin={false} />}
              exact
            >
              <Route
                path="/update-password"
                element={<UpdatePassword />}
                exact
              />
            </Route>

            <Route
              path="/orders"
              element={<ProtectedRoute isAdmin={false} />}
              exact
            >
              <Route path="/orders" element={<ListOrders />} exact />
            </Route>

            <Route
              path="/orders/:id"
              element={<ProtectedRoute isAdmin={false} />}
              exact
            >
              <Route path="/orders/:id" element={<OrderDetails />} exact />
            </Route>

            <Route
              path="/dashboard"
              element={<ProtectedRoute isAdmin={true} />}
              exact
            >
              <Route path="/dashboard" element={<Dashboard />} exact />
            </Route>

            <Route
              path="/admin/products"
              element={<ProtectedRoute isAdmin={true} />}
              exact
            >
              <Route path="/admin/products" element={<ProductList />} exact />
            </Route>

            <Route
              path="/admin/products/:id"
              element={<ProtectedRoute isAdmin={true} />}
              exact
            >
              <Route
                path="/admin/products/:id"
                element={<UpdateProduct />}
                exact
              />
            </Route>

            <Route
              path="/admin/products/new"
              element={<ProtectedRoute isAdmin={true} />}
              exact
            >
              <Route
                path="/admin/products/new"
                element={<NewProduct />}
                exact
              />
            </Route>

            <Route
              path="/admin/orders"
              element={<ProtectedRoute isAdmin={true} />}
              exact
            >
              <Route path="/admin/orders" element={<OrdersList />} exact />
            </Route>

            <Route
              path="/admin/order/:id"
              element={<ProtectedRoute isAdmin={true} />}
              exact
            >
              <Route path="/admin/order/:id" element={<ProcessOrder />} exact />
            </Route>

            <Route
              path="/admin/users"
              element={<ProtectedRoute isAdmin={true} />}
              exact
            >
              <Route path="/admin/users" element={<UsersList />} exact />
            </Route>

            <Route
              path="/admin/user/:id"
              element={<ProtectedRoute isAdmin={true} />}
              exact
            >
              <Route path="/admin/user/:id" element={<UpdateUser />} exact />
            </Route>

            <Route
              path="/product/reviews"
              element={<ProtectedRoute isAdmin={true} />}
              exact
            >
              <Route
                path="/product/reviews"
                element={<ProductReviews />}
                exact
              />
            </Route>

            <Route
              path="/cart"
              element={<ProtectedRoute isAdmin={false} />}
              exact
            >
              <Route path="/cart" element={<Cart />} exact />
            </Route>

            <Route
              path="/shipping"
              element={<ProtectedRoute isAdmin={false} />}
              exact
            >
              <Route path="/shipping" element={<Shipping />} exact />
            </Route>

            <Route
              path="/confirm"
              element={<ProtectedRoute isAdmin={false} />}
              exact
            >
              <Route path="/confirm" element={<ConfirmOrder />} exact />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
