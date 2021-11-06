import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// Layout Components
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <h1>Nutritiva</h1>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
