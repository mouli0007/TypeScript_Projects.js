import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
// Components !

import Home from "./Pages/Home";
import Store from "./Pages/Store";
import About from "./Pages/About";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Store />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
};

export default App;
