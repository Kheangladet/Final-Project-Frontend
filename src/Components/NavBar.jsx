import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { tours } from "../data/tours";
import logo from "../assets/image/logo.png";
import SearchBar from "./SearchBar";
import LogIn from "../auth/LogIn";

const NavBar = () => {
  const [menuopen, setmenuopen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-3 py-3">
        {/* Logo */}
        <Link to={"/"} className="items-center text-blue-700">
          <img src={logo} alt="logo" className="w-35 h-10 object-cover px-2" />
        </Link>

        {/* Nav Links — hidden on mobile, row on desktop */}
        <ul className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className="text-md font-medium hover:text-black transition-all duration-300 text-blue-500"
          >
            Home
          </NavLink>
          <NavLink
            to="/tours"
            className="text-md font-medium hover:text-black transition-all duration-300 text-blue-500"
          >
            Tours
          </NavLink>
          <NavLink
            to="/about"
            className="text-md font-medium hover:text-black transition-all duration-300 text-blue-500"
          >
            About
          </NavLink>
          <NavLink
            to="/team"
            className="text-md font-medium hover:text-black transition-all duration-300 text-blue-500"
          >
            Team
          </NavLink>
        </ul>

        {/* Search Bar */}
        <div className="w-40 sm:w-64 md:w-72">
          <SearchBar data={tours} linkPrefix="/tours" />
        </div>

        {/* Bookings + Login Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <NavLink
            to="/bookings"
            className="text-md bg-blue-500 text-center px-1 py-2 text-white w-30 rounded-2xl font-medium hover:text-black transition-all duration-300"
          >
            Bookings
          </NavLink>
          <LogIn />
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          {menuopen ? (
            <IoMdClose
              onClick={() => setmenuopen(!menuopen)}
              size={24}
              className="hover:text-blue-500 transition-all duration-300 cursor-pointer"
            />
          ) : (
            <GiHamburgerMenu
              onClick={() => setmenuopen(!menuopen)}
              size={20}
              className="hover:text-blue-500 transition-all duration-300 cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuopen && (
        <div className="flex flex-col items-start gap-5 px-6 py-4 border-t border-gray-400 bg-white md:hidden">
          <NavLink
            to="/"
            className="text-sm font-medium hover:text-blue-500 transition-all duration-300"
            onClick={() => setmenuopen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/tours"
            className="text-sm font-medium hover:text-blue-500 transition-all duration-300"
            onClick={() => setmenuopen(false)}
          >
            Tours
          </NavLink>
          <NavLink
            to="/about"
            className="text-sm font-medium hover:text-blue-500 transition-all duration-300"
            onClick={() => setmenuopen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/team"
            className="text-sm font-medium hover:text-blue-500 transition-all duration-300"
            onClick={() => setmenuopen(false)}
          >
            Team
          </NavLink>

          {/* Mobile Bookings + Login */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/bookings"
              className="text-md bg-blue-500 text-center px-1 py-2 text-white w-20 rounded-2xl font-medium hover:text-black transition-all duration-300"
              onClick={() => setmenuopen(false)}
            >
              Bookings
            </NavLink>
            <LogIn />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
