import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { tourdetail } from "../data/tourdetail";
import { tours } from "../data/tours";

import { IoArrowBackSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { MdLocationOn, MdAccessTime } from "react-icons/md";

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

  // ⭐ SweetAlert booking confirmation
  const handleBooking = (hotel) => {
    Swal.fire({
      title: "Book this hotel? 🏨",
      text: `Confirm booking for ${hotel.name}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Book Now ✈️",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedHotel(hotel);

        Swal.fire({
          title: "Booking Started 🎉",
          text: "Please complete your booking details",
          icon: "success",
          draggable: true, // your draggable feature
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mt-16 mb-6 text-gray-400 hover:text-gray-700 transition-colors duration-200"
      >
        <IoArrowBackSharp size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Tour Banner */}
      {tour && (
        <div className="relative w-full h-56 sm:h-72 rounded-3xl overflow-hidden mb-8 shadow-md">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute bottom-5 left-6 right-6">
            <h1 className="text-white text-2xl font-bold">{tour.title}</h1>

            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-white/80 text-sm">
                <MdLocationOn size={14} />
                {tour.location}
              </span>

              <span className="flex items-center gap-1 text-white/80 text-sm">
                <MdAccessTime size={14} />
                {tour.duration}
              </span>

              <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                {tour.price}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">Where to Stay</h2>
        <p className="text-sm text-gray-400">Top recommended accommodations</p>
      </div>

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            {/* Image */}
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

            {/* Content */}
            <div className="p-5 space-y-3">
              <p className="text-base font-bold text-gray-800">{hotel.name}</p>

              <p className="text-gray-500 text-sm line-clamp-2">
                {hotel.description}
              </p>

              {/* Price */}
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold text-lg">
                  {hotel.price}
                </span>

                <span className="text-gray-400 text-xs">
                  {hotel.reviews} reviews
                </span>
              </div>

              {/* ⭐ Book Button */}
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

      {/* Booking Modal */}
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
