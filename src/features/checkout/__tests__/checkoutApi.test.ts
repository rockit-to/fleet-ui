import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchBookingData, submitPayment } from "../api/checkoutApi";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("fetchBookingData", () => {
  beforeEach(() => mockFetch.mockReset());

  it("fetches booking data for a given booking id", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: "booking_001", property: { title: "Queenstown Villa" } }),
    });
    const data = await fetchBookingData("booking_001");
    expect(data.property.title).toBe("Queenstown Villa");
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("booking_001"));
  });

  it("throws when the API returns an error status", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(fetchBookingData("invalid-id")).rejects.toThrow();
  });
});

describe("submitPayment", () => {
  beforeEach(() => mockFetch.mockReset());

  it("sends a POST request to the payments endpoint", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, confirmationId: "conf_abc" }),
    });
    const paymentData = { bookingId: "booking_001", amount: 833, currency: "usd", method: "creditcard" };
    await submitPayment(paymentData);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("payments"),
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("serializes payment data as a JSON string in the request body", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
    const paymentData = { bookingId: "booking_001", amount: 500, currency: "usd", method: "creditcard" };
    await submitPayment(paymentData);

    const requestBody = mockFetch.mock.calls[0][1].body;

    // body must be a serialized JSON string, not a raw object
    expect(typeof requestBody).toBe("string");
    expect(() => JSON.parse(requestBody)).not.toThrow();
    expect(JSON.parse(requestBody)).toMatchObject(paymentData);
  });
});
