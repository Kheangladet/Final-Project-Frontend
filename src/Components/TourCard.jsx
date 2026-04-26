import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import {
  MdGroups,
  MdLocationOn,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { tours } from "../data/tours";

const TourCard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(tours.map((tour) => tour.category))];
  const filteredTours =
    selectedCategory === "All"
      ? tours
      : tours.filter((tour) => tour.category === selectedCategory);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Curated Journeys
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Find the right tour for your next Cambodia escape
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
            Handpicked trips designed around culture, coastline, and nature,
            with flexible group sizes and memorable local experiences.
          </p>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            Available Tours
          </p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {filteredTours.length}
            </span>
            <span className="pb-1 text-sm text-gray-500">ready to explore</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
              selectedCategory === cat
                ? "border-blue-500 bg-blue-500 text-white shadow-sm shadow-blue-200"
                : "border-gray-300 bg-white text-gray-500 hover:border-blue-400 hover:text-blue-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredTours.map((tour) => (
          <article
            key={tour.id}
            className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative cursor-pointer overflow-hidden">
              <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
                <div className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-sm text-amber-400 shadow-sm ring-1 ring-black/5 backdrop-blur">
                  <FaStar />
                  <span className="font-semibold">{tour.rating}</span>
                </div>
                <span className="max-w-[50%] truncate rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur">
                  {tour.featured}
                </span>
              </div>

              <img
                src={tour.image}
                alt={tour.title}
                className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {tour.category}
                  </p>
                  <h2 className="mt-1 line-clamp-2 text-lg font-bold leading-snug text-gray-900">
                    {tour.title}
                  </h2>
                </div>
                <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {tour.duration}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <MdLocationOn size={17} className="shrink-0 text-blue-500" />
                <span className="truncate">{tour.location}</span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                {tour.description}
              </p>

              <div className="mt-4 rounded-3xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
                      Starting from
                    </p>
                    <span className="mt-1 block text-2xl font-bold text-gray-900">
                      {tour.price}
                    </span>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600 ring-1 ring-gray-100">
                    {tour.reviews} reviews
                  </span>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-gray-500">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2">
                      <MdGroups size={16} className="shrink-0 text-blue-500" />
                      <span className="truncate">{tour.groupSize}</span>
                    </span>
                    <span className="whitespace-nowrap font-semibold text-blue-500">
                      {tour.rating} rating
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineCalendarMonth
                      size={16}
                      className="shrink-0 text-blue-500"
                    />
                    <span>Best season: {tour.bestSeason}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Trip highlight
                </p>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-700">
                  {tour.highlight}
                </p>
              </div>

              <div className="mt-auto pt-5">
                <button
                  className="h-11 w-full rounded-2xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-blue-600"
                  onClick={() => navigate(`/tours/${tour.id}`)}
                >
                  View Tour Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TourCard;
