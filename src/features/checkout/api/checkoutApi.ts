import type { BookingData, PaymentRequest, PaymentResponse } from "../types";

// API configuration
const API_BASE_URL = "http://localhost:3002/api/fleet/checkout";

// Get booking ID from URL or use default
const getBookingIdFromUrl = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get('bookingId') || 'prop_001';
};

// Fetch booking data from real API
export const fetchBookingData = async (
  bookingId?: string
): Promise<BookingData> => {
  try {
    const finalBookingId = bookingId || getBookingIdFromUrl();
    const response = await fetch(`${API_BASE_URL}/bookings/${finalBookingId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch booking data: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching booking data:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch booking data"
    );
  }
};

// Submit payment via API
export const submitPayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error(`Payment failed: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: true,
      confirmationId: result.confirmationId || result.id,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Payment failed. Please try again.",
    };
  }
};