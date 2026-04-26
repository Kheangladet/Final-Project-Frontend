import React from "react";
import Hero from "../Components/Hero";
import Tours from "./Tours";
import About from "./About";
import Team from "./Team";

const Home = () => {
  return (
    <div>
      <section id="home" className="scroll-mt-24">
        <Hero />
      </section>
      <section id="tours" className="scroll-mt-24">
        <Tours />
      </section>
      <section id="about" className="scroll-mt-24">
        <About />
      </section>
      <section id="reviews" className="scroll-mt-24">
        <Team />
      </section>
    </div>
  );
};

export default Home;
