import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { tours } from "../data/tours";

const TourCard = () => {
  const navigate = useNavigate();

  const [selectCategory, setselectCategory] = useState("All");
  const categories = ["All", ...new Set(tours.map((p) => p.category))];
  const filterProducts =
    selectCategory === "All"
      ? tours
      : tours.filter((p) => p.category === selectCategory);

  return (
    <div className="mt-2 mx-5 px-8">
      {/* Heading */}
      <h1 className="font-bold text-xl">Our Popular Destination</h1>
      <p className="text-gray-400 font-medium text-sm mt-2">
        Popular destinations to kickstart your planning
      </p>

      {/* ── Category Filter Tabs ── */}
      <div className="flex gap-2 flex-wrap mt-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setselectCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition duration-200 ${
              selectCategory === cat
                ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                : "bg-white text-gray-500 border-gray-300 hover:border-blue-400 hover:text-blue-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <hr className="w-full border-gray-200 my-3" />

      {/* ── Tour Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filterProducts.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="relative group cursor-pointer overflow-hidden">
              <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full text-amber-400 text-sm shadow">
                  <FaStar />
                  <span className="font-semibold">{tour.rating}</span>
                </div>
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                  {tour.duration}
                </span>
              </div>
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h2 className="font-bold text-lg">{tour.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {tour.description}
              </p>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-gray-500">{tour.location}</span>
                <span className="font-semibold text-blue-500">
                  {tour.price}
                </span>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  className="flex-1 bg-blue-500 text-white rounded-xl h-10 hover:bg-blue-600 transition"
                  onClick={() => navigate(`/tours/${tour.id}`)}
                >
                  View Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourCard;
