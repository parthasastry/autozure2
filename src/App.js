import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ShowRoom from "./components/ShowRoom";
import CarDetails from "./components/CarDetails";
import SellCar from "./components/SellCar";
import Footer from "./components/Footer";

import { GlobalProvider } from "./context/GlobalState";

const App = () => {
  return (
    <>
      <GlobalProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/buy" element={<ShowRoom />} />
            <Route path="/:vin" element={<CarDetails />} />
            <Route path="/sell" element={<SellCar />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </Router>
      </GlobalProvider>
    </>
  );
};

export default App;
