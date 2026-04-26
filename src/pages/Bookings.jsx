import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(() =>
    JSON.parse(localStorage.getItem("bookings") || "[]"),
  );

  const handleDelete = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mt-16 mb-6 text-gray-400 hover:text-gray-700 transition-colors duration-200"
      >
        <IoArrowBackSharp size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">My Bookings</h1>
        <p className="text-sm text-gray-400 mt-1">
          {bookings.length} booking{bookings.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="text-5xl">🏨</span>
          <p className="text-gray-400 text-sm">No bookings yet</p>
          <button
            onClick={() => navigate("/tours")}
            className="bg-blue-500 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-600 transition"
          >
            Explore Tours
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={booking.hotelImage}
                  alt={booking.hotelName}
                  className="w-full h-44 object-cover"
                />
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-red-50 hover:text-red-400 text-gray-400 p-1.5 rounded-full transition"
                >
                  <IoMdClose size={16} />
                </button>
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full shadow flex items-center gap-1.5">
                  <FaStar className="text-amber-400" size={11} />
                  <span className="text-gray-700">{booking.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <p className="font-bold text-gray-800">{booking.hotelName}</p>

                <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <MdLocationOn size={13} className="text-blue-400" />
                  {booking.area}
                </span>

                <div className="bg-gray-50 rounded-2xl p-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Guest</span>
                    <span className="font-medium text-gray-700">
                      {booking.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Email</span>
                    <span className="font-medium text-gray-700 truncate ml-4">
                      {booking.email}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Phone</span>
                    <span className="font-medium text-gray-700">
                      {booking.phone}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Check-in</span>
                    <span className="font-medium text-gray-700">
                      {booking.checkIn}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Check-out</span>
                    <span className="font-medium text-gray-700">
                      {booking.checkOut}
                    </span>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Price</p>
                    <span className="text-blue-600 font-bold">
                      {booking.price}
                    </span>
                    <span className="text-gray-400 text-xs ml-1">
                      {booking.priceNote}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                    {new Date(booking.bookedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
