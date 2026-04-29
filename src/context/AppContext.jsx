import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const USERS_KEY = "travio_users";
const CURRENT_USER_KEY = "travio_current_user_id";
const FAVORITES_KEY = "travio_favorites";
const BOOKINGS_KEY = "bookings";

const AppContext = createContext(null);

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const persistJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(() => readJson(USERS_KEY, []));
  const [currentUserId, setCurrentUserId] = useState(() =>
    localStorage.getItem(CURRENT_USER_KEY),
  );
  const [favoritesByUser, setFavoritesByUser] = useState(() =>
    readJson(FAVORITES_KEY, {}),
  );
  const [bookings, setBookings] = useState(() => readJson(BOOKINGS_KEY, []));

  useEffect(() => {
    persistJson(USERS_KEY, users);
  }, [users]);

  useEffect(() => {
    persistJson(FAVORITES_KEY, favoritesByUser);
  }, [favoritesByUser]);

  useEffect(() => {
    persistJson(BOOKINGS_KEY, bookings);
  }, [bookings]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(CURRENT_USER_KEY, currentUserId);
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUserId]);

  const currentUser = useMemo(
    () => users.find((user) => user.id === currentUserId) || null,
    [currentUserId, users],
  );

  const favoriteIds = currentUser
    ? favoritesByUser[currentUser.id] || []
    : [];

  const userBookings = currentUser
    ? bookings.filter((booking) => booking.userId === currentUser.id)
    : bookings.filter((booking) => !booking.userId);

  const registerAccount = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((user) => user.email === normalizedEmail)) {
      return {
        ok: false,
        message: "An account with this email already exists.",
      };
    }

    const nextUser = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    setUsers((currentUsers) => [...currentUsers, nextUser]);
    setCurrentUserId(nextUser.id);

    return { ok: true, user: nextUser };
  };

  const loginAccount = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const foundUser = users.find(
      (user) => user.email === normalizedEmail && user.password === password,
    );

    if (!foundUser) {
      return {
        ok: false,
        message: "Incorrect email or password.",
      };
    }

    setCurrentUserId(foundUser.id);
    return { ok: true, user: foundUser };
  };

  const logoutAccount = () => {
    setCurrentUserId(null);
  };

  const toggleFavorite = (tourId) => {
    if (!currentUser) {
      return {
        ok: false,
        message: "Please sign in to save favorite tours.",
      };
    }

    let wasAdded = false;

    setFavoritesByUser((currentFavorites) => {
      const existingFavorites = currentFavorites[currentUser.id] || [];
      const alreadySaved = existingFavorites.includes(tourId);
      const nextFavorites = alreadySaved
        ? existingFavorites.filter((id) => id !== tourId)
        : [...existingFavorites, tourId];

      wasAdded = !alreadySaved;

      return {
        ...currentFavorites,
        [currentUser.id]: nextFavorites,
      };
    });

    return { ok: true, saved: wasAdded };
  };

  const addBooking = (booking) => {
    const nextBooking = {
      ...booking,
      id: Date.now(),
      userId: currentUser?.id || null,
      userName: currentUser?.name || booking.name,
      userEmail: currentUser?.email || booking.email,
      bookedAt: new Date().toISOString(),
    };

    setBookings((currentBookings) => [...currentBookings, nextBooking]);
    return nextBooking;
  };

  const removeBooking = (bookingId) => {
    setBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.id !== bookingId),
    );
  };

  const value = {
    bookings,
    currentUser,
    favoriteIds,
    isAuthenticated: Boolean(currentUser),
    loginAccount,
    logoutAccount,
    registerAccount,
    toggleFavorite,
    addBooking,
    removeBooking,
    userBookings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
