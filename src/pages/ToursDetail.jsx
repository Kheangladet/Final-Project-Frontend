import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { tourdetail } from "../data/tourdetail";
import { tours } from "../data/tours";

import { IoArrowBackSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import {
  MdAccessTime,
  MdGroups,
  MdLocationOn,
  MdOutlineCalendarMonth,
} from "react-icons/md";

import BookingModal from "../Components/BookingModal";

const ToursDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState(null);

  const hotels = tourdetail[id];
  const tour = tours.find((t) => t.id === parseInt(id));

  if (!hotels) {
    return (
      <h2 className="text-center mt-20 text-2xl font-bold">Tour Not Found</h2>
    );
  }

  const handleBooking = (hotel) => {
    setSelectedHotel(hotel);
  };

  const topRatedHotel = hotels?.reduce((best, current) =>
    current.rating > best.rating ? current : best
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mt-16 mb-6 text-gray-400 hover:text-gray-700 transition-colors duration-200"
      >
        <IoArrowBackSharp size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {tour && (
        <>
          <div className="relative mb-8 overflow-hidden rounded-3xl shadow-md">
            <div className="h-64 w-full sm:h-80 lg:h-[25rem]">
              <img
                src={tour.image}
                alt={tour.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-600">
                  {tour.category}
                </span>
                <span className="rounded-full bg-slate-900/75 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {tour.featured}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-white sm:text-4xl">
                {tour.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1 text-sm text-white/85">
                  <MdLocationOn size={15} />
                  {tour.location}
                </span>
                <span className="flex items-center gap-1 text-sm text-white/85">
                  <MdAccessTime size={15} />
                  {tour.duration}
                </span>
                <span className="flex items-center gap-1 text-sm text-white/85">
                  <FaStar size={13} className="text-amber-300" />
                  {tour.rating} rating
                </span>
                <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                  From {tour.price}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Tour Overview
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Why travelers choose this experience
              </h2>
              <p className="mt-4 leading-7 text-gray-600">
                {tour.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                    Highlight
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-800">
                    {tour.highlight}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                    Best for
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-800">
                    Travelers who want a {tour.category.toLowerCase()} trip with
                    strong local experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 text-gray-700">
                  <MdGroups className="text-blue-500" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      Group Size
                    </p>
                    <p className="text-sm font-semibold">{tour.groupSize}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 text-gray-700">
                  <MdOutlineCalendarMonth
                    className="text-blue-500"
                    size={20}
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      Best Season
                    </p>
                    <p className="text-sm font-semibold">{tour.bestSeason}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaStar className="text-amber-400" size={18} />
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      Social Proof
                    </p>
                    <p className="text-sm font-semibold">
                      {tour.reviews} traveler reviews
                    </p>
                  </div>
                </div>
              </div>
              {topRatedHotel && (
                <div className="rounded-3xl bg-blue-600 p-5 text-white shadow-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-blue-100">
                    Recommended Stay
                  </p>
                  <p className="mt-2 text-lg font-bold">{topRatedHotel.name}</p>
                  <p className="mt-1 text-sm text-blue-100">
                    Rated {topRatedHotel.rating} and located in {topRatedHotel.area}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Where to Stay</h2>
          <p className="text-sm text-gray-400">
            Top recommended accommodations for this trip
          </p>
        </div>
        <div className="rounded-full bg-white px-4 py-2 text-sm text-gray-500 shadow-sm ring-1 ring-gray-100">
          {hotels.length} stay options available
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="relative overflow-hidden">
              <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
                <div className="bg-white/80 text-xs font-semibold px-2 py-1 rounded-full shadow flex items-center gap-1">
                  <FaStar className="text-amber-400" size={11} />
                  {hotel.rating}
                </div>

                {hotel.badge && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {hotel.badge}
                  </span>
                )}
              </div>

              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-gray-800">{hotel.name}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
                    {hotel.area}
                  </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {hotel.stars} star
                </span>
              </div>

              <p className="text-gray-500 text-sm line-clamp-3">
                {hotel.description}
              </p>

              <div className="rounded-2xl bg-gray-50 p-3 text-sm text-gray-500">
                <div className="flex items-center justify-between gap-3">
                  <span>{hotel.distance}</span>
                  <span className="font-semibold text-blue-600">
                    {hotel.ratingLabel}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 text-xs">
                  <span>Location score: {hotel.locationScore}</span>
                  <span>{hotel.reviews} reviews</span>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-blue-600 font-bold text-lg">
                    {hotel.price}
                  </span>
                  <p className="text-xs text-gray-400">{hotel.priceNote}</p>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  {hotel.area}
                </span>
              </div>

              <button
                onClick={() => handleBooking(hotel)}
                className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white w-full h-10 rounded-2xl transition-all duration-200 text-sm font-medium"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedHotel && (
        <BookingModal
          hotel={selectedHotel}
          tour={tour}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </div>
  );
};

export default ToursDetail;
