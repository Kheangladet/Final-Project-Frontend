import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

const BookingModal = ({ hotel, tour, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!form.checkOut) newErrors.checkOut = "Check-out date is required";
    if (form.checkIn && form.checkOut && form.checkIn >= form.checkOut)
      newErrors.checkOut = "Check-out must be after check-in";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const booking = {
      id: Date.now(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.image,
      area: hotel.area,
      price: hotel.price,
      priceNote: hotel.priceNote,
      rating: hotel.rating,
      tourName: tour?.title || "",
      tourLocation: tour?.location || "",
      ...form,
      bookedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Success Screen
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-400 text-sm mb-1">Your booking at</p>
          <p className="text-blue-600 font-semibold mb-1">{hotel.name}</p>
          <p className="text-gray-400 text-sm mb-6">
            has been saved successfully.
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Name</span>
              <span className="font-medium text-gray-700">{form.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Check-in</span>
              <span className="font-medium text-gray-700">{form.checkIn}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Check-out</span>
              <span className="font-medium text-gray-700">{form.checkOut}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Price</span>
              <span className="font-medium text-blue-600">
                {hotel.price} {hotel.priceNote}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full h-11 rounded-2xl text-sm font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Book Your Stay</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Hotel Info */}
        <div className="px-6 py-4 flex items-center gap-4 bg-gray-50 border-b border-gray-100">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-800 text-sm truncate">
              {hotel.name}
            </p>
            <span className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
              <MdLocationOn size={12} className="text-blue-400" />
              {hotel.area}
            </span>
            <div className="flex items-center gap-1 mt-1">
              <FaStar size={11} className="text-amber-400" />
              <span className="text-xs text-gray-600 font-medium">
                {hotel.rating}
              </span>
              <span className="text-xs text-gray-400 ml-1">
                {hotel.ratingLabel}
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-blue-600 font-bold text-base">{hotel.price}</p>
            <p className="text-gray-400 text-xs">{hotel.priceNote}</p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition ${
                errors.name
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition ${
                errors.email
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+855 12 345 678"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition ${
                errors.phone
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              }`}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                Check-in
              </label>
              <input
                type="date"
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition ${
                  errors.checkIn
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                }`}
              />
              {errors.checkIn && (
                <p className="text-red-400 text-xs mt-1">{errors.checkIn}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                Check-out
              </label>
              <input
                type="date"
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                min={form.checkIn || new Date().toISOString().split("T")[0]}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition ${
                  errors.checkOut
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                }`}
              />
              {errors.checkOut && (
                <p className="text-red-400 text-xs mt-1">{errors.checkOut}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white w-full h-11 rounded-2xl text-sm font-medium transition-all duration-200 mt-2"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
