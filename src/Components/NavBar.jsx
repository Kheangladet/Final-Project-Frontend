import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FiUser, FiCalendar } from "react-icons/fi";
import { tours } from "../data/tours";
import logo from "../assets/image/logo.png";
import SearchBar from "./SearchBar";
import LogIn from "../auth/LogIn";

const NavBar = () => {
  const [menuopen, setmenuopen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-32 h-10 object-contain" />
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-6">
          {["/", "/tours", "/about", "/team"].map((path, i) => {
            const names = ["Home", "Tours", "About", "Team"];
            return (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                {names[i]}
              </NavLink>
            );
          })}
        </ul>

        {/* Search */}
        <div className="hidden md:block w-64">
          <SearchBar data={tours} linkPrefix="/tours" />
        </div>

        {/* Right Side Icons */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Bookings */}
          <NavLink
            to="/bookings"
            className="p-2 rounded-lg hover:bg-gray-100 transition group"
          >
            <FiCalendar
              size={20}
              className="text-gray-700 group-hover:text-blue-600"
            />
          </NavLink>

          {/* Login */}
          <LogIn
            trigger={
              <div className="p-2 rounded-lg hover:bg-gray-100 transition group cursor-pointer">
                <FiUser
                  size={20}
                  className="text-gray-700 group-hover:text-blue-600"
                />
              </div>
            }
          />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {menuopen ? (
            <IoMdClose onClick={() => setmenuopen(false)} size={24} />
          ) : (
            <GiHamburgerMenu onClick={() => setmenuopen(true)} size={20} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuopen && (
        <div className="flex flex-col gap-4 px-6 py-4 border-t bg-white md:hidden">
          {["/", "/tours", "/about", "/team"].map((path, i) => {
            const names = ["Home", "Tours", "About", "Team"];
            return (
              <NavLink
                key={i}
                to={path}
                onClick={() => setmenuopen(false)}
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                {names[i]}
              </NavLink>
            );
          })}

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 pt-2">
            <NavLink to="/bookings" onClick={() => setmenuopen(false)}>
              <FiCalendar
                className="text-gray-700 hover:text-blue-600"
                size={20}
              />
            </NavLink>

            <LogIn
              trigger={
                <FiUser
                  size={20}
                  className="text-gray-700 hover:text-blue-600 cursor-pointer"
                />
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
