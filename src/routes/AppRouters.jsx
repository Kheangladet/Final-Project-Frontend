import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import About from "../pages/About";
import ToursDetail from "../pages/ToursDetail";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Bookings from "../pages/Bookings";
import Team from "../pages/Team";
import { AppProvider } from "../context/AppContext";

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const sectionId = location.hash.replace("#", "");

    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const timeoutId = window.setTimeout(scrollToSection, 80);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);

  return null;
};

const AppRouters = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToHash />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Team />} />
          <Route path="/tours/:id" element={<ToursDetail />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
};

export default AppRouters;
