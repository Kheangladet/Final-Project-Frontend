import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

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
    else if (form.checkIn && form.checkOut <= form.checkIn)
      newErrors.checkOut = "Check-out must be after check-in";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const booking = {
      id: Date.now(),
      hotelName: hotel.name,
      hotelImage: hotel.image,
      area: hotel.area,
      rating: hotel.rating,
      price: hotel.price,
      priceNote: hotel.priceNote,
      tourTitle: tour?.title || "",
      ...form,
      bookedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in">
        {/* Header */}
        <div className="relative">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-36 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-500 hover:text-gray-800 p-1.5 rounded-full transition"
          >
            <IoMdClose size={16} />
          </button>
        </div>

        {/* Hotel info row */}
        <div className="flex items-center justify-between px-5 pt-4 pb-1">
          <div>
            <p className="font-bold text-gray-800 text-base leading-tight">
              {hotel.name}
            </p>
            <span className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <MdLocationOn size={12} className="text-blue-400" />
              {hotel.area}
            </span>
          </div>
          <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700">
            <FaStar size={11} className="text-amber-400" />
            {hotel.rating}
          </span>
        </div>

        <div className="p-5 max-h-[65vh] overflow-y-auto">
          {!submitted ? (
            <>
              <p className="text-sm font-semibold text-gray-800 mb-4">
                Complete your booking
              </p>

              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full rounded-2xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-100 ${
                      errors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-100 bg-gray-50 focus:border-blue-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full rounded-2xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-100 ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-100 bg-gray-50 focus:border-blue-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    className={`w-full rounded-2xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-100 ${
                      errors.phone
                        ? "border-red-300 bg-red-50"
                        : "border-gray-100 bg-gray-50 focus:border-blue-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={form.checkIn}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full rounded-2xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-100 ${
                        errors.checkIn
                          ? "border-red-300 bg-red-50"
                          : "border-gray-100 bg-gray-50 focus:border-blue-300"
                      }`}
                    />
                    {errors.checkIn && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.checkIn}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      value={form.checkOut}
                      onChange={handleChange}
                      min={
                        form.checkIn || new Date().toISOString().split("T")[0]
                      }
                      className={`w-full rounded-2xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-100 ${
                        errors.checkOut
                          ? "border-red-300 bg-red-50"
                          : "border-gray-100 bg-gray-50 focus:border-blue-300"
                      }`}
                    />
                    {errors.checkOut && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.checkOut}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Price summary */}
              <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3">
                <span className="text-xs text-gray-400">Price</span>
                <div className="text-right">
                  <span className="text-blue-600 font-bold">{hotel.price}</span>
                  <span className="text-gray-400 text-xs ml-1">
                    {hotel.priceNote}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={onClose}
                  className="flex-1 h-11 rounded-2xl border border-gray-100 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 h-11 rounded-2xl bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-medium transition-all duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-2xl">
                ✅
              </div>
              <p className="font-bold text-gray-800">Booking Confirmed!</p>
              <p className="text-sm text-gray-400">
                Your stay at{" "}
                <span className="text-gray-600 font-medium">{hotel.name}</span>{" "}
                has been saved.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
