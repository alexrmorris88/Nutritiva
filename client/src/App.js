import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./components/Home";

// User Components
import Register from "./components/user/Register";
import Login from "./components/user/Login";

// Product Components
import ProductDetails from "./components/products/productDetails";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/register" element={<Register />} 
            exact />
            <Route path="/login" element={<Login />} 
            exact />
            <Route path="/products/:id" element={<ProductDetails />} exact />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
