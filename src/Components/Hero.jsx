import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";
import { MdLocationOn } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { HiCurrencyDollar } from "react-icons/hi";
import { bannerData } from "../data/BannerData";

const Hero = () => {
  const [current, setcurrent] = useState(0);
  const el = useRef(null);
  const navigate = useNavigate();
  const banner = bannerData[current];

  useEffect(() => {
    const slider = setInterval(() => {
      setcurrent((prev) => (prev + 1) % bannerData.length);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  useEffect(() => {
    if (!el.current) return;

    const type = new Typed(el.current, {
      strings: bannerData.map((item) => item.title),
      typeSpeed: 40,
      backSpeed: 30,
      backDelay: 2500,
      loop: true,
    });

    return () => type.destroy();
  }, []);

  return (
    <div
      className="relative h-[90vh] sm:h-[75vh] md:h-[90vh] w-full"
      style={{
        backgroundImage: `url(${banner.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full flex-col justify-center text-white max-w-6xl mx-auto px-6 sm:px-10">
        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-300 mb-2">
          {banner.category}
        </p>

        <div className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight max-w-3xl">
          <h1>
            <span ref={el} />
          </h1>
        </div>

        <p className="text-sm sm:text-base max-w-xl mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none text-white/90">
          {banner.description}
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm mb-4 sm:mb-6 text-blue-200">
          <div className="flex items-center gap-1.5">
            <MdLocationOn />
            <span className="text-white">{banner.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IoTime />
            <span className="text-white">{banner.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HiCurrencyDollar />
            <span className="text-white">{banner.price}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button
            className="bg-blue-500 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => navigate("/#tours")}
          >
            Explore Tours
          </button>
          <button
            className="border border-white/80 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-white hover:text-black transition-colors"
            onClick={() => navigate("/#about")}
          >
            Why Travel With Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
