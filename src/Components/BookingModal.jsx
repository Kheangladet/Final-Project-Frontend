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

  // Extract number from hotel price
  const priceNumber = parseFloat(hotel.price.replace(/[^0-9.]/g, "")) || 0;

  // Calculate nights
  const nights =
    form.checkIn && form.checkOut
      ? Math.max(
          0,
          (new Date(form.checkOut) - new Date(form.checkIn)) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  // Calculate total price
  const totalPrice = nights * priceNumber;

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.checkIn) newErrors.checkIn = "Check-in required";
    if (!form.checkOut) newErrors.checkOut = "Check-out required";
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

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    const alreadyBooked = existing.find(
      (b) => b.hotelId === hotel.id && b.email === form.email,
    );

    if (alreadyBooked) {
      setErrors({ general: "You already booked this hotel." });
      return;
    }

    const booking = {
      id: Date.now(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.image,
      area: hotel.area,
      price: hotel.price,
      nights,
      totalPrice,
      ...form,
      bookedAt: new Date().toISOString(),
    };

    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
          <FaStar size={32} className="text-blue-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Booking Confirmed
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Your booking at <span className="font-semibold">{hotel.name}</span>
          </p>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm mb-6">
            <div className="flex justify-between">
              <span>Name</span>
              <span>{form.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Check-in</span>
              <span>{form.checkIn}</span>
            </div>
            <div className="flex justify-between">
              <span>Check-out</span>
              <span>{form.checkOut}</span>
            </div>
            <div className="flex justify-between">
              <span>Nights</span>
              <span>{nights}</span>
            </div>
            <div className="flex justify-between font-semibold text-blue-600">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full h-11 rounded-xl text-sm font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Book Your Stay</h2>
          <button onClick={onClose}>
            <IoMdClose size={22} />
          </button>
        </div>
        {/* HOTEL INFO */}
        <div className="px-6 py-4 flex gap-4 bg-gray-50 border-b">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm">{hotel.name}</p>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <MdLocationOn size={12} />
              {hotel.area}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <FaStar size={12} className="text-amber-400" />
              <span className="text-xs">{hotel.rating}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-600 font-semibold">{hotel.price}</p>
            <p className="text-xs text-gray-400">{hotel.priceNote}</p>
          </div>
        </div>
        {/* FORM */}
        <div className="px-6 py-5 space-y-4">
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2.5 text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2.5 text-sm"
          />
          <input
            type="tel"
            name="phone"
            placeholder="+855 12 345 678"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2.5 text-sm"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              className="border rounded-xl px-3 py-2.5 text-sm"
            />
            <input
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              className="border rounded-xl px-3 py-2.5 text-sm"
            />
          </div>
          {nights > 0 && (
            <div className="bg-gray-50 border rounded-xl p-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  {hotel.price} × {nights} nights
                </span>
                <span>${totalPrice}</span>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-blue-600">${totalPrice}</span>
              </div>
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full h-11 rounded-xl text-sm font-semibold transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
