import React from "react";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

      <p className="text-center text-gray-600 mb-12">
        Have questions or need help planning your trip? We’d love to hear from
        you.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">📍 Address</h3>
            <p className="text-gray-600">Phnom Penh, Cambodia</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">📞 Phone</h3>
            <p className="text-gray-600">+855 12 345 678</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">✉️ Email</h3>
            <p className="text-gray-600">travelagency@email.com</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">🕒 Working Hours</h3>
            <p className="text-gray-600">Mon — Sun : 8:00 AM — 8:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4 bg-white p-8 rounded-2xl shadow">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
