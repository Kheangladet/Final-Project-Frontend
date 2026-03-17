import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import About from "../pages/About";
import ToursDetail from "../pages/ToursDetail";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Bookings from "../pages/Bookings";
import Team from "../pages/Team";

const AppRouters = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/tours/:id" element={<ToursDetail />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouters;
