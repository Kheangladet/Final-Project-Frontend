import React, { useState } from "react";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

export default function LogIn({ trigger }) {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Trigger from Navbar */}
      {trigger &&
        React.cloneElement(trigger, {
          onClick: () => setOpen(true),
        })}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h2>

            {/* Register only */}
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-sm text-gray-500"
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </button>
            </div>

            {/* Button */}
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            {/* Toggle */}
            <p className="text-center text-sm text-gray-600 mt-4">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 hover:underline"
              >
                {isLogin ? "Register" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
