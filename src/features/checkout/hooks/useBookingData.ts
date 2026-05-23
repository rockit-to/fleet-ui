import { useState, useEffect } from "react";
import { fetchBookingData } from "../api/checkoutApi";
import type { BookingData } from "../types";

/**
 * Custom hook for managing booking data fetching and state
 */
export const useBookingData = () => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [booking, setBooking] = useState<BookingData["booking"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookingData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchBookingData();
        setBookingData(data);
        setBooking(data.booking);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load booking data";
        setError(errorMessage);
        console.error("Error loading booking data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookingData();
  }, []);

  // Separate refetch function for manual reloading
  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchBookingData();
      setBookingData(data);
      setBooking(data.booking);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load booking data";
      setError(errorMessage);
      console.error("Error loading booking data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bookingData,
    booking,
    setBooking,
    isLoading,
    error,
    refetch,
  };
};
