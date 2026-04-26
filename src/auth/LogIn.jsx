import React, { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { FiArrowRight, FiMail, FiUser, FiX } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";

const inputClassName =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100";

const PasswordToggle = ({ visible, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
    aria-label={visible ? "Hide password" : "Show password"}
  >
    {visible ? <BiHide size={20} /> : <BiShow size={20} />}
  </button>
);

export default function LogIn({ trigger }) {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, {
          onClick: (event) => {
            trigger.props.onClick?.(event);
            setOpen(true);
          },
        })}

      {open && (
        <div className="fixed inset-0 z-[60] bg-slate-950/65 backdrop-blur-sm">
          <div className="flex min-h-dvh items-stretch justify-center p-0 sm:p-4 lg:items-center lg:p-6">
            <div className="relative flex min-h-dvh w-full overflow-hidden bg-white shadow-2xl sm:min-h-0 sm:max-w-2xl sm:rounded-[32px] lg:max-h-[calc(100dvh-3rem)] lg:max-w-5xl">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative hidden overflow-hidden bg-slate-900 px-8 py-10 text-white lg:block">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.38),_transparent_42%),linear-gradient(160deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.88))]" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                        Travio Account
                      </p>
                      <h2 className="mt-5 max-w-sm text-4xl font-bold leading-tight">
                        {isLogin
                          ? "Welcome back to smarter trip planning."
                          : "Create an account for faster booking."}
                      </h2>
                      <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                        Save favorite trips, manage bookings, and keep your travel
                        plans in one clean place.
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                        <p className="text-sm font-medium text-white">
                          Secure and simple
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          Built for quick access to your bookings, saved tours,
                          and upcoming plans.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                          <p className="text-2xl font-bold">24/7</p>
                          <p className="mt-1 text-sm text-slate-300">
                            Booking support
                          </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                          <p className="text-2xl font-bold">Fast</p>
                          <p className="mt-1 text-sm text-slate-300">
                            Checkout flow
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex min-h-dvh flex-col overflow-y-auto p-5 pt-20 sm:min-h-0 sm:max-h-[85dvh] sm:p-8 sm:pt-20 lg:max-h-[calc(100dvh-3rem)] lg:p-10 lg:pt-10">
                  <button
                    onClick={closeModal}
                    className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition hover:border-gray-300 hover:text-gray-700"
                    aria-label="Close login modal"
                  >
                    <FiX size={18} />
                  </button>

                  <div className="mx-auto w-full max-w-md pr-12 sm:pr-14">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                      {isLogin ? "Sign In" : "Register"}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                      {isLogin ? "Access your account" : "Create your profile"}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {isLogin
                        ? "Continue to manage bookings, saved tours, and your next adventure."
                        : "Join to save favorite destinations and book tours with less friction."}
                    </p>
                  </div>

                  <form
                    className="mx-auto mt-8 w-full max-w-md space-y-4 sm:space-y-5"
                    onSubmit={(event) => event.preventDefault()}
                  >
                  {!isLogin && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <div className="relative">
                        <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          autoComplete="name"
                          placeholder="Enter your full name"
                          className={`${inputClassName} pl-11`}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="relative">
                      <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={`${inputClassName} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <RiLockPasswordLine className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        autoComplete={isLogin ? "current-password" : "new-password"}
                        placeholder="Enter your password"
                        className={`${inputClassName} pl-11 pr-12`}
                      />
                      <PasswordToggle
                        visible={showPassword}
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Confirm password
                      </label>
                      <div className="relative">
                        <RiLockPasswordLine className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="Confirm your password"
                          className={`${inputClassName} pl-11 pr-12`}
                        />
                        <PasswordToggle
                          visible={showConfirmPassword}
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                    <label className="inline-flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>
                        {isLogin
                          ? "Keep me signed in"
                          : "I agree to the terms and privacy policy"}
                      </span>
                    </label>
                    {isLogin && (
                      <button
                        type="button"
                        className="font-medium text-blue-600 transition hover:text-blue-700"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-blue-600">
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    <FiArrowRight size={16} />
                  </button>
                  </form>

                  <div className="mx-auto mt-6 w-full max-w-md rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    {isLogin ? "New here?" : "Already have an account?"}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="ml-2 font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      {isLogin ? "Create an account" : "Sign in instead"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
