import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import Swal from "sweetalert2";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

const BookingModal = ({ hotel, tour, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });

  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];
  const priceNumber = parseFloat(hotel.price.replace(/[^0-9.]/g, "")) || 0;

  const nights =
    form.checkIn && form.checkOut
      ? Math.max(
          0,
          (new Date(form.checkOut) - new Date(form.checkIn)) / DAY_IN_MS,
        )
      : 0;

  const totalPrice = nights * priceNumber;

  const normalizeEmail = (email) => email.trim().toLowerCase();
  const normalizePhone = (phone) => phone.replace(/\D/g, "");

  const hasDateOverlap = (existingBooking) => {
    if (!form.checkIn || !form.checkOut) return false;

    const currentCheckIn = new Date(form.checkIn);
    const currentCheckOut = new Date(form.checkOut);
    const existingCheckIn = new Date(existingBooking.checkIn);
    const existingCheckOut = new Date(existingBooking.checkOut);

    return currentCheckIn < existingCheckOut && currentCheckOut > existingCheckIn;
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (normalizePhone(form.phone).length < 8)
      newErrors.phone = "Phone number must be at least 8 digits";

    if (!form.checkIn) newErrors.checkIn = "Check-in required";
    else if (form.checkIn < today)
      newErrors.checkIn = "Check-in cannot be in the past";

    if (!form.checkOut) newErrors.checkOut = "Check-out required";
    else if (form.checkIn && form.checkIn >= form.checkOut)
      newErrors.checkOut = "Check-out must be after check-in";
    else if (nights > 30) newErrors.checkOut = "Stay cannot be longer than 30 nights";

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
      (booking) =>
        booking.hotelId === hotel.id &&
        normalizeEmail(booking.email) === normalizeEmail(form.email) &&
        hasDateOverlap(booking),
    );

    if (alreadyBooked) {
      setErrors({
        general: "You already have an overlapping booking for this hotel.",
      });
      return;
    }

    const booking = {
      id: Date.now(),
      hotelId: hotel.id,
      tourId: tour?.id,
      tourTitle: tour?.title,
      hotelName: hotel.name,
      hotelImage: hotel.image,
      area: hotel.area,
      rating: hotel.rating,
      price: hotel.price,
      priceNote: hotel.priceNote,
      nights,
      totalPrice,
      ...form,
      email: normalizeEmail(form.email),
      bookedAt: new Date().toISOString(),
    };

    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));

    Swal.fire({
      title: "Booking Confirmed",
      text: `Your stay at ${hotel.name} has been booked successfully.`,
      icon: "success",
      confirmButtonColor: "#2563eb",
    }).then(() => {
      onClose();
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((currentForm) => {
      const nextForm = { ...currentForm, [name]: value };

      if (
        name === "checkIn" &&
        nextForm.checkOut &&
        nextForm.checkOut <= value
      ) {
        const nextCheckOut = new Date(value);
        nextCheckOut.setDate(nextCheckOut.getDate() + 1);
        nextForm.checkOut = nextCheckOut.toISOString().split("T")[0];
      }

      return nextForm;
    });

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
      general: "",
    }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Book Your Stay</h2>
          <button onClick={onClose} aria-label="Close booking modal">
            <IoMdClose size={22} />
          </button>
        </div>

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

        <div className="px-6 py-5 space-y-4">
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}

          <div className="space-y-1.5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              className="w-full border rounded-xl px-4 py-2.5 text-sm"
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full border rounded-xl px-4 py-2.5 text-sm"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <input
              type="tel"
              name="phone"
              placeholder="+855 12 345 678"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              className="w-full border rounded-xl px-4 py-2.5 text-sm"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <input
                type="date"
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                min={today}
                className="w-full border rounded-xl px-3 py-2.5 text-sm"
              />
              {errors.checkIn && (
                <p className="text-xs text-red-500">{errors.checkIn}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <input
                type="date"
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                min={form.checkIn || today}
                className="w-full border rounded-xl px-3 py-2.5 text-sm"
              />
              {errors.checkOut && (
                <p className="text-xs text-red-500">{errors.checkOut}</p>
              )}
            </div>
          </div>

          {nights > 0 && (
            <div className="bg-gray-50 border rounded-xl p-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  {hotel.price} x {nights} night{nights > 1 ? "s" : ""}
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
