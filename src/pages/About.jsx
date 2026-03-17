import React from "react";
import phnompenh from "../assets/image/hero/phnompenh.png";
const About = () => {
  return (
    <div className="bg-gray-50">
      {/* 🌏 ABOUT TEXT */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Discover Cambodia With Us ✈️
        </h2>

        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          We specialize in unforgettable travel experiences across Cambodia —
          from ancient temples to tropical islands. Our mission is to make every
          journey safe, exciting, and memorable.
        </p>

        {/* IMAGE + TEXT */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src={phnompenh}
            alt="Travel Cambodia"
            className="rounded-2xl shadow-xl"
          />

          <div>
            <h3 className="text-2xl font-semibold mb-4">Why Travel With Us?</h3>

            <ul className="space-y-4 text-gray-700">
              <li>✔ Experienced local guides</li>
              <li>✔ Carefully designed tour packages</li>
              <li>✔ Affordable prices</li>
              <li>✔ Safe and comfortable trips</li>
              <li>✔ 24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ⭐ STATS SECTION */}
      <div className="bg-blue-600 text-white py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          <div>
            <h3 className="text-4xl font-bold">10K+</h3>
            <p>Happy Travelers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">150+</h3>
            <p>Tours Completed</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">20+</h3>
            <p>Destinations</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">5★</h3>
            <p>Customer Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
