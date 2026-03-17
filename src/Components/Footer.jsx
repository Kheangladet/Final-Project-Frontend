import React from "react";
import { BsStack } from "react-icons/bs";
import facebook from "../assets/image/footer/facebook.png";
import instagram from "../assets/image/footer/instagram.png";
import x from "../assets/image/footer/x.png";
import linkedin from "../assets/image/footer/linkedin.png";
import logo from "../assets/image/logo.png";
import { CiLocationOn } from "react-icons/ci";
import { IoCall } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="mt-[60px]">
      {/* Newsletter Banner */}
      <div className="relative overflow-hidden bg-blue-600 w-full px-8 py-10">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/2">
            <h2 className="text-white text-2xl font-bold leading-tight tracking-tight">
              Get travel inspiration in your inbox
            </h2>
            <p className="text-blue-100 text-sm mt-2 font-light tracking-wide">
              Deals, guides, and trip ideas — no spam, ever.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your Email Address"
              className="outline-none bg-white w-full py-2.5 px-5 rounded-2xl placeholder-gray-400 text-gray-800 text-sm shadow-lg focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <button className="bg-blue-950 text-white hover:bg-blue-900 transition-all duration-200 px-6 py-2.5 rounded-2xl font-semibold text-sm w-full sm:w-auto whitespace-nowrap shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-950 w-full px-8 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src={logo}
                alt="logo"
                className="w-32 h-auto object-contain"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Curated travel experiences for the modern explorer. Every journey
              starts with a story.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { src: x, alt: "Twitter" },
                { src: linkedin, alt: "LinkedIn" },
                { src: facebook, alt: "Facebook" },
                { src: instagram, alt: "Instagram" },
              ].map((image, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-200 flex items-center justify-center"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-4 h-4 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                "All Tours",
                "Popular Destinations",
                "Adventure Trips",
                "Beach Getaways",
                "City Breaks",
                "Cultural Tours",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Team",
                "Careers",
                "Press",
                "Blog",
                "Partners",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Contact Us",
                "Privacy Policy",
                "Terms of Use",
                "Cancellation Policy",
                "Accessibility",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CiLocationOn color="blue" />
                <span className="text-gray-500 text-sm leading-relaxed">
                  123 Explorer Ave, Suite 4B
                  <br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center gap-3">
                <IoCall color="blue" />
                <a
                  href="tel:+14155550199"
                  className="text-gray-500 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  +1 (415) 555-0199
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMessage color="blue" />
                <a
                  href="mailto:hello@travio.com"
                  className="text-gray-500 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  hello@travio.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IoIosTime color="blue" />
                <span className="text-gray-500 text-sm">
                  Mon–Fri, 9am – 6pm PST
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs tracking-wide">
            © {new Date().getFullYear()} Travio. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {["Visa", "MC", "PayPal", "Amex"].map((card) => (
              <span
                key={card}
                className="text-gray-600 text-xs border border-gray-700 px-2 py-0.5 rounded"
              >
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
