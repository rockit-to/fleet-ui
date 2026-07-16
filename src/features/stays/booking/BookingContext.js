import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "fleet:stays:booking-draft";
const SAVED_STAYS_KEY = "fleet:stays:saved";
const PUBLISHED_STAYS_KEY = "fleet:stays:published";
const CONFIRMED_BOOKINGS_KEY = "fleet:stays:confirmed-bookings";
const MESSAGES_KEY = "fleet:stays:messages";
const BookingContext = createContext(null);

function loadDraft() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadSavedStays() {
  try { return JSON.parse(sessionStorage.getItem(SAVED_STAYS_KEY) ?? "[]"); } catch { return []; }
}
function loadPublishedStays() {
  try { return JSON.parse(sessionStorage.getItem(PUBLISHED_STAYS_KEY) ?? "[]"); } catch { return []; }
}
function loadConfirmedBookings() {
  try { return JSON.parse(sessionStorage.getItem(CONFIRMED_BOOKINGS_KEY) ?? "[]"); } catch { return []; }
}
function loadMessages() {
  try { return JSON.parse(sessionStorage.getItem(MESSAGES_KEY) ?? "[]"); } catch { return []; }
}

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(loadDraft);
  const [savedStayIds, setSavedStayIds] = useState(loadSavedStays);
  const [publishedStays, setPublishedStays] = useState(loadPublishedStays);
  const [confirmedBookings, setConfirmedBookings] = useState(loadConfirmedBookings);
  const [messages, setMessages] = useState(loadMessages);

  useEffect(() => {
    try {
      if (booking) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [booking]);
  useEffect(() => {
    try { sessionStorage.setItem(SAVED_STAYS_KEY, JSON.stringify(savedStayIds)); } catch {}
  }, [savedStayIds]);
  useEffect(() => {
    try { sessionStorage.setItem(PUBLISHED_STAYS_KEY, JSON.stringify(publishedStays)); } catch {}
  }, [publishedStays]);
  useEffect(() => {
    try { sessionStorage.setItem(CONFIRMED_BOOKINGS_KEY, JSON.stringify(confirmedBookings)); } catch {}
  }, [confirmedBookings]);
  useEffect(() => { try { sessionStorage.setItem(MESSAGES_KEY, JSON.stringify(messages)); } catch {} }, [messages]);

  const startBooking = (draft) => setBooking((current) => ({
    ...current,
    ...draft,
    status: "draft",
  }));
  const updateBooking = (patch) => setBooking((current) => current ? { ...current, ...patch } : current);
  const completeBooking = (paymentMethod) => {
    const confirmed = {
      ...booking,
      paymentMethod,
      status: "confirmed",
      bookingCode: `FLT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    };
    setBooking(confirmed);
    setConfirmedBookings((bookings) => [confirmed, ...bookings.filter((item) => item.bookingCode !== confirmed.bookingCode)]);
  };
  const clearBooking = () => setBooking(null);
  const toggleSavedStay = (stayId) => setSavedStayIds((ids) => ids.includes(stayId)
    ? ids.filter((id) => id !== stayId)
    : [...ids, stayId]);
  const publishStay = (draft) => {
    const stay = {
      ...draft,
      id: `host-stay-${Date.now()}`,
      rating: "New",
      reviews: "0",
      priceOld: "",
      categoryText: "new listing",
      cost: "New listing",
      src: draft.image || "/images/content/card-pic-1.jpg",
      srcSet: draft.image || "/images/content/card-pic-1@2x.jpg",
      flexibleCancellation: true,
      beachDistanceKm: 8,
      longStayEligible: true,
      propertyType: "entire-home",
      status: "published",
    };
    setPublishedStays((items) => [stay, ...items]);
    return stay;
  };
  const sendMessage = (text) => setMessages((items) => [...items, { id: Date.now(), text, author: "You", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);

  return (
    <BookingContext.Provider value={{ booking, startBooking, updateBooking, completeBooking, clearBooking, confirmedBookings, savedStayIds, toggleSavedStay, publishedStays, publishStay, messages, sendMessage }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
}
