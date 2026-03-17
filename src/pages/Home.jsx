import React from "react";
import NavBar from "../Components/NavBar";
import Hero from "../Components/Hero";
import Tours from "./Tours";
import About from "./About";
import Team from "./Team";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Tours />
      <About />
      <Team />
    </div>
  );
};

export default Home;
