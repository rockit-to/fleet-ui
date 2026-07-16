import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "fleet:session";
const SessionContext = createContext(null);
const initialUser = { displayName: "Guest", email: "guest@fleet.travel", loggedIn: true };

export function SessionProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return { ...initialUser, ...JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") }; } catch { return initialUser; }
  });
  useEffect(() => { try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user)); } catch {} }, [user]);
  const login = (email) => setUser((current) => ({ ...current, email, displayName: email.split("@")[0] || "Guest", loggedIn: true }));
  const logout = () => setUser((current) => ({ ...current, loggedIn: false }));
  const updateProfile = (patch) => setUser((current) => ({ ...current, ...patch }));
  return <SessionContext.Provider value={{ user, login, logout, updateProfile }}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used within SessionProvider");
  return value;
}
