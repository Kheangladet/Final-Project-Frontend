import React, { useEffect, useMemo, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { FiArrowRight, FiMail, FiUser, FiX } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useAppContext } from "../context/AppContext";

const inputClassName =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

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
  const {
    currentUser,
    favoriteIds,
    isAuthenticated,
    loginAccount,
    logoutAccount,
    registerAccount,
    userBookings,
  } = useAppContext();

  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
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

  const stats = useMemo(
    () => [
      { label: "Saved Tours", value: favoriteIds.length },
      { label: "Bookings", value: userBookings.length },
    ],
    [favoriteIds.length, userBookings.length],
  );

  const closeModal = () => {
    setOpen(false);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const resetForm = () => {
    setForm(initialFormState);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    resetForm();
  };

  const validate = () => {
    const nextErrors = {};

    if (!isAuthenticated && !isLogin && !form.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (!isLogin && form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
      general: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const action = isLogin
      ? loginAccount({ email: form.email, password: form.password })
      : registerAccount({
          name: form.name,
          email: form.email,
          password: form.password,
        });

    if (!action.ok) {
      setErrors({ general: action.message });
      return;
    }

    Swal.fire({
      title: isLogin ? "Welcome Back" : "Account Created",
      text: isLogin
        ? `You're signed in as ${action.user.name}.`
        : `Your account for ${action.user.name} is ready.`,
      icon: "success",
      confirmButtonColor: "#2563eb",
    });

    resetForm();
    closeModal();
  };

  const handleLogout = () => {
    logoutAccount();
    closeModal();
    Swal.fire({
      title: "Signed Out",
      text: "Your session has been cleared on this device.",
      icon: "success",
      confirmButtonColor: "#2563eb",
    });
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
                        {isAuthenticated
                          ? `Welcome, ${currentUser.name.split(" ")[0]}.`
                          : isLogin
                            ? "Welcome back to smarter trip planning."
                            : "Create an account for faster booking."}
                      </h2>
                      <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                        {isAuthenticated
                          ? "Your saved tours, bookings, and next travel ideas stay together in one place."
                          : "Save favorite trips, manage bookings, and keep your travel plans in one clean place."}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                        <p className="text-sm font-medium text-white">
                          {isAuthenticated ? "Your activity" : "Secure and simple"}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {isAuthenticated
                            ? `${userBookings.length} booking${userBookings.length !== 1 ? "s" : ""} and ${favoriteIds.length} saved tour${favoriteIds.length !== 1 ? "s" : ""} ready whenever you return.`
                            : "Built for quick access to your bookings, saved tours, and upcoming plans."}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {stats.map((item) => (
                          <div
                            key={item.label}
                            className="rounded-3xl border border-white/10 bg-white/5 p-5"
                          >
                            <p className="text-2xl font-bold">{item.value}</p>
                            <p className="mt-1 text-sm text-slate-300">
                              {item.label}
                            </p>
                          </div>
                        ))}
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
                      {isAuthenticated
                        ? "Your Account"
                        : isLogin
                          ? "Sign In"
                          : "Register"}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                      {isAuthenticated
                        ? "Manage your travel profile"
                        : isLogin
                          ? "Access your account"
                          : "Create your profile"}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {isAuthenticated
                        ? "See your saved tours, booking activity, and account details from one place."
                        : isLogin
                          ? "Continue to manage bookings, saved tours, and your next adventure."
                          : "Join to save favorite destinations and book tours with less friction."}
                    </p>
                  </div>

                  {isAuthenticated ? (
                    <div className="mx-auto mt-8 w-full max-w-md space-y-5">
                      <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                          Signed In As
                        </p>
                        <p className="mt-2 text-lg font-bold text-gray-900">
                          {currentUser.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {currentUser.email}
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {stats.map((item) => (
                          <div
                            key={item.label}
                            className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                              {item.label}
                            </p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-blue-600"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <>
                      <form
                        className="mx-auto mt-8 w-full max-w-md space-y-4 sm:space-y-5"
                        onSubmit={handleSubmit}
                      >
                        {errors.general && (
                          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {errors.general}
                          </div>
                        )}

                        {!isLogin && (
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Full name
                            </label>
                            <div className="relative">
                              <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                name="name"
                                autoComplete="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className={`${inputClassName} pl-11`}
                              />
                            </div>
                            {errors.name && (
                              <p className="mt-2 text-xs text-red-500">{errors.name}</p>
                            )}
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
                              name="email"
                              autoComplete="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="you@example.com"
                              className={`${inputClassName} pl-11`}
                            />
                          </div>
                          {errors.email && (
                            <p className="mt-2 text-xs text-red-500">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <div className="relative">
                            <RiLockPasswordLine className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              autoComplete={isLogin ? "current-password" : "new-password"}
                              value={form.password}
                              onChange={handleChange}
                              placeholder="Enter your password"
                              className={`${inputClassName} pl-11 pr-12`}
                            />
                            <PasswordToggle
                              visible={showPassword}
                              onClick={() => setShowPassword((prev) => !prev)}
                            />
                          </div>
                          {errors.password && (
                            <p className="mt-2 text-xs text-red-500">{errors.password}</p>
                          )}
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
                                name="confirmPassword"
                                autoComplete="new-password"
                                value={form.confirmPassword}
                                onChange={handleChange}
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
                            {errors.confirmPassword && (
                              <p className="mt-2 text-xs text-red-500">
                                {errors.confirmPassword}
                              </p>
                            )}
                          </div>
                        )}

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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
