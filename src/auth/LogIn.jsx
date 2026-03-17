import React, { useState } from "react";

export default function LogIn() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {/* Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="text-md bg-blue-500 text-white w-28 px-1 py-2 rounded-2xl font-medium hover:text-black transition-all duration-300"
      >
        Login
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 relative shadow-xl">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-gray-500"
            >
              ✖
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isLogin ? "Login" : "Register"}
            </h2>

            {/* Register-only field */}
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full mb-3 p-2 border rounded-2xl"
              />
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded-2xl"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border rounded-2xl"
            />

            {/* Button */}
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            {/* Toggle */}
            <p className="text-center mt-4 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 font-semibold"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
