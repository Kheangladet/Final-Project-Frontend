import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FiUser, FiCalendar } from "react-icons/fi";
import { tours } from "../data/tours";
import logo from "../assets/image/logo.png";
import SearchBar from "./SearchBar";
import LogIn from "../auth/LogIn";

const navItems = [
  { id: "home", label: "Home" },
  { id: "tours", label: "Tours" },
  { id: "about", label: "About" },
  { id: "reviews", label: "Reviews" },
];

const NavBar = () => {
  const [menuopen, setmenuopen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeSection =
    location.pathname === "/"
      ? location.hash.replace("#", "") || "home"
      : "";

  const handleSectionNav = (sectionId) => {
    navigate(sectionId === "home" ? "/" : `/#${sectionId}`);
    setmenuopen(false);
  };

  const desktopSectionClass = (sectionId) =>
    `relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
      activeSection === sectionId
        ? "bg-blue-50 text-blue-600 shadow-sm"
        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
    }`;

  const mobileSectionClass = (sectionId) =>
    `w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
      activeSection === sectionId
        ? "bg-blue-50 text-blue-600 border border-blue-100"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="shrink-0" onClick={() => setmenuopen(false)}>
          <img src={logo} alt="logo" className="w-32 h-10 object-contain" />
        </Link>

        <div className="hidden lg:flex items-center rounded-full border border-gray-200 bg-white/80 p-1 shadow-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSectionNav(item.id)}
              className={desktopSectionClass(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block flex-1 max-w-xs">
          <SearchBar data={tours} linkPrefix="/tours" />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/60"
              }`
            }
          >
            <FiCalendar size={16} />
            Bookings
          </NavLink>

          <LogIn
            trigger={
              <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/60 transition cursor-pointer">
                <FiUser size={16} />
                Account
              </div>
            }
          />
        </div>

        <button
          type="button"
          onClick={() => setmenuopen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2 text-gray-700 shadow-sm"
        >
          {menuopen ? <IoMdClose size={22} /> : <GiHamburgerMenu size={18} />}
        </button>
      </div>

      {menuopen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="mt-4">
            <SearchBar data={tours} linkPrefix="/tours" />
          </div>

          <div className="mt-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSectionNav(item.id)}
                className={mobileSectionClass(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <NavLink
              to="/bookings"
              onClick={() => setmenuopen(false)}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FiCalendar size={16} />
              Bookings
            </NavLink>

            <LogIn
              trigger={
                <div className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <FiUser size={16} />
                  Account
                </div>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
