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
              path="/product/admin/products"
              element={<ProtectedRoute isAdmin={true} />}
              exact
            >
              <Route
                path="/product/admin/products"
                element={<ProductList />}
                exact
              />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
