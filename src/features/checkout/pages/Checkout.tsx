import { useState, useCallback, useEffect } from "react";
import {
  CheckoutPaymentTab,
  GuestType,
  Currency,
  ValidationRules,
} from "../types";
import { submitPayment } from "../api/checkoutApi";
import DatePicker from "../../../components/ui/DatePicker";
import { useBookingData, useClickOutside, usePricing } from "../hooks";
import { LoadingState, ErrorState, BookingSuccess } from "../components";

// Utility functions
const isGuestCountValid = (guestType: GuestType, count: number): boolean => {
  if (guestType === GuestType.Adults) {
    return count >= ValidationRules.MIN_ADULTS;
  }
  return count >= 0;
};

const canDecrementGuest = (guestType: GuestType, count: number): boolean => {
  if (guestType === GuestType.Adults) {
    return count > ValidationRules.MIN_ADULTS;
  }
  return count > 0;
};

const formatCurrency = (amount: number, currency: Currency): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

const isAtMaxGuestLimit = (guests: {
  adults: number;
  children: number;
  babies: number;
}): boolean => {
  const totalGuests = guests.adults + guests.children + guests.babies;
  return totalGuests >= ValidationRules.MAX_GUESTS;
};

const Checkout = () => {
  // Business logic state
  const [activePaymentTab, setActivePaymentTab] = useState<CheckoutPaymentTab>(
    CheckoutPaymentTab.CreditCard,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<{
    confirmationId: string;
    totalAmount: string;
  } | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<string>("");
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [isContactSelectOpen, setIsContactSelectOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState("tam@gmail.com");

  // Data management hooks
  const { bookingData, booking, setBooking, isLoading, error, refetch } =
    useBookingData();
  const priceBreakdown = usePricing(bookingData && booking ? {
    basePrice: bookingData.pricing.basePrice,
    nights: booking.nights,
    cleaningFee: bookingData.pricing.cleaningFee,
    serviceFeePercentage: bookingData.pricing.serviceFeePercentage,
    taxPercentage: bookingData.pricing.taxPercentage,
    discountPercentage: bookingData.pricing.discountPercentage,
  } : null);

  // Outside click detection
  const guestsRef = useClickOutside<HTMLDivElement>(
    () => setIsGuestsOpen(false),
    isGuestsOpen,
  );
  const contactSelectRef = useClickOutside<HTMLDivElement>(
    () => setIsContactSelectOpen(false),
    isContactSelectOpen,
  );

  // Utility functions
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  // Set initial dates when booking data loads
  useEffect(() => {
    if (booking) {
      const checkInFormatted = formatDate(booking.checkIn);
      const checkOutFormatted = formatDate(booking.checkOut);
      setSelectedDates(`${checkInFormatted} - ${checkOutFormatted}`);
    }
  }, [booking, formatDate]);

  // Event handlers
  const handlePaymentTabClick = useCallback((tabName: CheckoutPaymentTab) => {
    setActivePaymentTab(tabName);
  }, []);

  const handleDateChange = useCallback(
    (newDateRange: string) => {
      setSelectedDates(newDateRange);

      // Update booking dates if valid range is selected
      if (newDateRange && newDateRange.includes(" - ")) {
        const [start, end] = newDateRange.split(" - ");

        if (booking) {
          // Parse dates directly since they now include year
          const startDate = new Date(start);
          const endDate = new Date(end);

          // Convert to YYYY-MM-DD format using local timezone to avoid UTC shift
          const startFormatted = `${startDate.getFullYear()}-${String(
            startDate.getMonth() + 1,
          ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
          const endFormatted = `${endDate.getFullYear()}-${String(
            endDate.getMonth() + 1,
          ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

          // Calculate nights between dates
          const timeDiff = endDate.getTime() - startDate.getTime();
          const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

          setBooking((prev) =>
            prev
              ? {
                  ...prev,
                  checkIn: startFormatted,
                  checkOut: endFormatted,
                  nights: Math.max(1, nights), // Ensure at least 1 night
                }
              : null,
          );
        }
      }
    },
    [booking, setBooking],
  );

  const handleContactSelect = useCallback((contact: string) => {
    setSelectedContact(contact);
    setIsContactSelectOpen(false);
  }, []);

  const handleGuestCountChange = useCallback(
    (type: GuestType, increment: boolean) => {
      setBooking((prev) => {
        if (!prev) return prev;
        const currentCount = prev.guests[type];
        let newCount: number;

        if (increment) {
          newCount = currentCount + 1;
          // Check if increment is allowed (max guests validation)
          const totalGuests =
            prev.guests.adults + prev.guests.children + prev.guests.babies;
          if (totalGuests >= ValidationRules.MAX_GUESTS) {
            return prev; // Don't allow more than max guests
          }
        } else {
          if (canDecrementGuest(type, currentCount)) {
            newCount = currentCount - 1;
          } else {
            return prev; // Don't update if can't decrement
          }
        }

        // Final validation check
        if (!isGuestCountValid(type, newCount)) {
          return prev;
        }

        return {
          ...prev,
          guests: {
            ...prev.guests,
            [type]: newCount,
          },
        };
      });
    },
    [setBooking],
  );

  const getTotalGuests = useCallback(() => {
    if (!booking) return 0;
    return (
      booking.guests.adults + booking.guests.children + booking.guests.babies
    );
  }, [booking]);

  const handleSubmitPayment = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!bookingData) return;

      setIsSubmitting(true);
      setPaymentError(null);

      try {
        const paymentResult = await submitPayment({
          method: activePaymentTab,
          amount: priceBreakdown.total,
          bookingId: bookingData.property.id,
        });

        if (paymentResult.success) {
          const totalAmount = formatCurrency(
            priceBreakdown.total,
            bookingData.pricing.currency,
          );
          setPaymentSuccess({
            confirmationId: paymentResult.confirmationId || "N/A",
            totalAmount,
          });
        } else {
          setPaymentError(
            paymentResult.error || "Payment failed. Please try again.",
          );
        }
      } catch (err) {
        console.error("Payment error:", err);
        setPaymentError("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [activePaymentTab, priceBreakdown.total, bookingData],
  );

  // Show loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Show error state
  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  // Show nothing if data not loaded yet
  if (!bookingData || !booking) {
    return null;
  }

  return (
    <div className="section-mb80 checkout checkout_stays">
      <div className="checkout__center center">
        <div className="control">
          <a
            className="button-stroke button-small control__button"
           
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              id="icon-arrow-left"
              className="icon icon-arrow-left"
            >
              <path d="M12.207.521a1.78 1.78 0 0 1 0 2.514L7.242 8l4.965 4.965a1.78 1.78 0 0 1 0 2.514 1.78 1.78 0 0 1-2.514 0L3.471 9.257a1.78 1.78 0 0 1 0-2.514L9.693.521a1.78 1.78 0 0 1 2.514 0z"></path>
            </svg>
            <span>Go home</span>
          </a>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link">
                Spectacular views of Queenstown
              </a>
            </li>
            <li className="breadcrumbs__item">Confirm and pay</li>
          </ul>
        </div>

        <div className="checkout__wrapper">
          <div className="checkout__inner js-tabs">
            <h2 className="checkout__title h2">
              {paymentSuccess ? "Booking confirmed" : "Confirm and pay"}
            </h2>
            <div className="checkout__list">
              {paymentSuccess ? (
                <BookingSuccess
                  confirmationId={paymentSuccess.confirmationId}
                  totalAmount={paymentSuccess.totalAmount}
                  checkIn={formatDate(booking.checkIn)}
                  checkOut={formatDate(booking.checkOut)}
                  guests={getTotalGuests()}
                  paymentMethod={
                    activePaymentTab === CheckoutPaymentTab.CreditCard
                      ? "Credit Card"
                      : "PayPal"
                  }
                  contactEmail={selectedContact}
                />
              ) : (
                <>
                  <div className="checkout__section">
                    {paymentError && (
                      <div className="checkout__error">
                        <div className="checkout__error-header">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 9v4m0 4h.01M12 2L2 20h20L12 2z"
                              stroke="#C53030"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="checkout__error-title">
                            Payment failed
                          </div>
                          <button
                            className="checkout__error-close"
                            type="button"
                            onClick={() => setPaymentError(null)}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 4L4 12M4 4l8 8"
                                stroke="#C53030"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="checkout__error-message">
                          {paymentError}
                        </div>
                      </div>
                    )}

                    <div className="checkout__box">
                      <div className="checkout__category">Your trip</div>
                      <div className="checkout__data checkout__data_flex">
                        <div className="checkout__el">
                          <DatePicker
                            value={selectedDates}
                            onChange={handleDateChange}
                            placeholder="Select dates"
                          />
                        </div>

                        <div className="checkout__el">
                          <div
                            ref={guestsRef}
                            className={`travelers travelers_down js-travelers ${
                              isGuestsOpen ? "active" : ""
                            }`}
                          >
                            <div className="travelers__top">
                              <div className="travelers__label">Guests</div>
                              <div className="travelers__value js-travelers-content">
                                {getTotalGuests()}{" "}
                                {getTotalGuests() === 1 ? "guest" : "guests"}
                              </div>
                              <button
                                className="travelers__edit js-travelers-head"
                                type="button"
                                onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 16 16"
                                  id="icon-edit"
                                  className="icon icon-edit"
                                >
                                  <path d="M13.283 14c.368 0 .667.298.667.667s-.299.667-.667.667H2.617c-.368 0-.667-.298-.667-.667S2.248 14 2.617 14h10.667zM12.031 1.138l1.448 1.448a2 2 0 0 1 0 2.828l-6.862 6.862c-.25.25-.589.39-.943.39H3.283c-.736 0-1.333-.597-1.333-1.333V8.943c0-.354.14-.693.391-.943l6.862-6.862a2 2 0 0 1 2.828 0zM3.617 8.609l-.333.333v2.391h2.391L6.007 11l-2.391-2.39zm5-5L4.56 7.666l2.391 2.39L11.007 6 8.617 3.609zm1.529-1.529l-.586.586 2.39 2.391.586-.586c.26-.26.26-.682 0-.943l-1.448-1.448c-.26-.26-.682-.26-.943 0z"></path>
                                </svg>
                              </button>
                            </div>
                            <div className="travelers__body js-travelers-body">
                              <div className="travelers__item">
                                <div className="travelers__details">
                                  <div className="travelers__category">
                                    Adults
                                  </div>
                                  <div className="travelers__text">
                                    Ages 13 or above
                                  </div>
                                </div>
                                <div
                                  className="counter js-counter"
                                  data-min="1"
                                >
                                  <button
                                    className={`counter__button js-counter-button js-counter-minus ${
                                      !canDecrementGuest(
                                        GuestType.Adults,
                                        booking.guests.adults,
                                      )
                                        ? "disabled"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() =>
                                      handleGuestCountChange(
                                        GuestType.Adults,
                                        false,
                                      )
                                    }
                                    disabled={
                                      !canDecrementGuest(
                                        GuestType.Adults,
                                        booking.guests.adults,
                                      )
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 16"
                                      id="icon-minus-circle"
                                      className="icon icon-minus-circle"
                                    >
                                      <path d="M8 1.333A6.67 6.67 0 0 1 14.666 8 6.67 6.67 0 0 1 8 14.666 6.67 6.67 0 0 1 1.333 8 6.67 6.67 0 0 1 8 1.333zm0 1.333C5.054 2.666 2.666 5.054 2.666 8S5.054 13.333 8 13.333 13.333 10.945 13.333 8 10.945 2.666 8 2.666zm3.333 4.667c.368 0 .667.298.667.667s-.298.667-.667.667h0-6.667C4.298 8.666 4 8.368 4 8s.298-.667.667-.667h0z"></path>
                                    </svg>
                                  </button>
                                  <div className="counter__value js-counter-value">
                                    {booking.guests.adults}
                                  </div>
                                  <button
                                    className={`counter__button js-counter-button js-counter-plus ${
                                      isAtMaxGuestLimit(booking.guests)
                                        ? "disabled"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() =>
                                      handleGuestCountChange(
                                        GuestType.Adults,
                                        true,
                                      )
                                    }
                                    disabled={isAtMaxGuestLimit(booking.guests)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 16"
                                      id="icon-plus-circle"
                                      className="icon icon-plus-circle"
                                    >
                                      <path d="M8 1.333A6.67 6.67 0 0 1 14.666 8 6.67 6.67 0 0 1 8 14.666 6.67 6.67 0 0 1 1.333 8 6.67 6.67 0 0 1 8 1.333zm0 1.333C5.054 2.666 2.666 5.054 2.666 8S5.054 13.333 8 13.333 13.333 10.945 13.333 8 10.945 2.666 8 2.666zM8 4c.368 0 .667.298.667.667v2.667h2.667c.368 0 .667.298.667.667s-.298.667-.667.667H8.666v2.667c0 .368-.298.667-.667.667s-.667-.298-.667-.667V8.666H4.666C4.298 8.666 4 8.368 4 8s.298-.667.667-.667h2.667V4.666C7.333 4.298 7.631 4 8 4z"></path>
                                    </svg>
                                  </button>
                                  <input
                                    className="js-counter-input js-counter-result js-counter-adults"
                                    type="hidden"
                                    value={booking.guests.adults}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="travelers__item">
                                <div className="travelers__details">
                                  <div className="travelers__category">
                                    Children
                                  </div>
                                  <div className="travelers__text">
                                    Ages 2 - 12
                                  </div>
                                </div>
                                <div
                                  className="counter js-counter"
                                  data-min="0"
                                >
                                  <button
                                    className={`counter__button js-counter-button js-counter-minus ${
                                      !canDecrementGuest(
                                        GuestType.Children,
                                        booking.guests.children,
                                      )
                                        ? "disabled"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() =>
                                      handleGuestCountChange(
                                        GuestType.Children,
                                        false,
                                      )
                                    }
                                    disabled={
                                      !canDecrementGuest(
                                        GuestType.Children,
                                        booking.guests.children,
                                      )
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 16"
                                      id="icon-minus-circle"
                                      className="icon icon-minus-circle"
                                    >
                                      <path d="M8 1.333A6.67 6.67 0 0 1 14.666 8 6.67 6.67 0 0 1 8 14.666 6.67 6.67 0 0 1 1.333 8 6.67 6.67 0 0 1 8 1.333zm0 1.333C5.054 2.666 2.666 5.054 2.666 8S5.054 13.333 8 13.333 13.333 10.945 13.333 8 10.945 2.666 8 2.666zm3.333 4.667c.368 0 .667.298.667.667s-.298.667-.667.667h0-6.667C4.298 8.666 4 8.368 4 8s.298-.667.667-.667h0z"></path>
                                    </svg>
                                  </button>
                                  <div className="counter__value js-counter-value">
                                    {booking.guests.children}
                                  </div>
                                  <button
                                    className={`counter__button js-counter-button js-counter-plus ${
                                      isAtMaxGuestLimit(booking.guests)
                                        ? "disabled"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() =>
                                      handleGuestCountChange(
                                        GuestType.Children,
                                        true,
                                      )
                                    }
                                    disabled={isAtMaxGuestLimit(booking.guests)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 16"
                                      id="icon-plus-circle"
                                      className="icon icon-plus-circle"
                                    >
                                      <path d="M8 1.333A6.67 6.67 0 0 1 14.666 8 6.67 6.67 0 0 1 8 14.666 6.67 6.67 0 0 1 1.333 8 6.67 6.67 0 0 1 8 1.333zm0 1.333C5.054 2.666 2.666 5.054 2.666 8S5.054 13.333 8 13.333 13.333 10.945 13.333 8 10.945 2.666 8 2.666zM8 4c.368 0 .667.298.667.667v2.667h2.667c.368 0 .667.298.667.667s-.298.667-.667.667H8.666v2.667c0 .368-.298.667-.667.667s-.667-.298-.667-.667V8.666H4.666C4.298 8.666 4 8.368 4 8s.298-.667.667-.667h2.667V4.666C7.333 4.298 7.631 4 8 4z"></path>
                                    </svg>
                                  </button>
                                  <input
                                    className="js-counter-input js-counter-result js-counter-children"
                                    type="hidden"
                                    value={booking.guests.children}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="travelers__item">
                                <div className="travelers__details">
                                  <div className="travelers__category">
                                    Infants
                                  </div>
                                  <div className="travelers__text">Under 2</div>
                                </div>
                                <div
                                  className="counter js-counter"
                                  data-min="0"
                                >
                                  <button
                                    className={`counter__button js-counter-button js-counter-minus ${
                                      !canDecrementGuest(
                                        GuestType.Babies,
                                        booking.guests.babies,
                                      )
                                        ? "disabled"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() =>
                                      handleGuestCountChange(
                                        GuestType.Babies,
                                        false,
                                      )
                                    }
                                    disabled={
                                      !canDecrementGuest(
                                        GuestType.Babies,
                                        booking.guests.babies,
                                      )
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 16"
                                      id="icon-minus-circle"
                                      className="icon icon-minus-circle"
                                    >
                                      <path d="M8 1.333A6.67 6.67 0 0 1 14.666 8 6.67 6.67 0 0 1 8 14.666 6.67 6.67 0 0 1 1.333 8 6.67 6.67 0 0 1 8 1.333zm0 1.333C5.054 2.666 2.666 5.054 2.666 8S5.054 13.333 8 13.333 13.333 10.945 13.333 8 10.945 2.666 8 2.666zm3.333 4.667c.368 0 .667.298.667.667s-.298.667-.667.667h0-6.667C4.298 8.666 4 8.368 4 8s.298-.667.667-.667h0z"></path>
                                    </svg>
                                  </button>
                                  <div className="counter__value js-counter-value">
                                    {booking.guests.babies}
                                  </div>
                                  <button
                                    className={`counter__button js-counter-button js-counter-plus ${
                                      isAtMaxGuestLimit(booking.guests)
                                        ? "disabled"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() =>
                                      handleGuestCountChange(
                                        GuestType.Babies,
                                        true,
                                      )
                                    }
                                    disabled={isAtMaxGuestLimit(booking.guests)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 16"
                                      id="icon-plus-circle"
                                      className="icon icon-plus-circle"
                                    >
                                      <path d="M8 1.333A6.67 6.67 0 0 1 14.666 8 6.67 6.67 0 0 1 8 14.666 6.67 6.67 0 0 1 1.333 8 6.67 6.67 0 0 1 8 1.333zm0 1.333C5.054 2.666 2.666 5.054 2.666 8S5.054 13.333 8 13.333 13.333 10.945 13.333 8 10.945 2.666 8 2.666zM8 4c.368 0 .667.298.667.667v2.667h2.667c.368 0 .667.298.667.667s-.298.667-.667.667H8.666v2.667c0 .368-.298.667-.667.667s-.667-.298-.667-.667V8.666H4.666C4.298 8.666 4 8.368 4 8s.298-.667.667-.667h2.667V4.666C7.333 4.298 7.631 4 8 4z"></path>
                                    </svg>
                                  </button>
                                  <input
                                    className="js-counter-input js-counter-result js-counter-babies"
                                    type="hidden"
                                    value={booking.guests.babies}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkout__box">
                      <div className="checkout__top">
                        <div className="checkout__category">Pay with</div>
                        <div className="nav">
                          <button
                            className={`nav__link js-tabs-link ${
                              activePaymentTab === CheckoutPaymentTab.CreditCard
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handlePaymentTabClick(
                                CheckoutPaymentTab.CreditCard,
                              )
                            }
                          >
                            Credit Card
                          </button>
                          <button
                            className={`nav__link js-tabs-link ${
                              activePaymentTab === CheckoutPaymentTab.PayPal
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handlePaymentTabClick(CheckoutPaymentTab.PayPal)
                            }
                          >
                            Paypal
                          </button>
                        </div>
                      </div>
                      <div className="field">
                        <div className="field__label">saved contact info</div>
                        <div className="field__wrap">
                          <select className="select checkout__hidden">
                            <option>tam@gmail.com</option>
                            <option>jimmy@gmail.com</option>
                            <option>john@gmail.com</option>
                          </select>
                          <div
                            ref={contactSelectRef}
                            className={`nice-select select ${
                              isContactSelectOpen ? "open" : ""
                            }`}
                            tabIndex={0}
                            onClick={() =>
                              setIsContactSelectOpen(!isContactSelectOpen)
                            }
                          >
                            <span className="current">{selectedContact}</span>
                            <ul className="list">
                              <li
                                data-value="tam@gmail.com"
                                className={`option ${
                                  selectedContact === "tam@gmail.com"
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleContactSelect("tam@gmail.com");
                                }}
                              >
                                tam@gmail.com
                              </li>
                              <li
                                data-value="jimmy@gmail.com"
                                className={`option ${
                                  selectedContact === "jimmy@gmail.com"
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleContactSelect("jimmy@gmail.com");
                                }}
                              >
                                jimmy@gmail.com
                              </li>
                              <li
                                data-value="john@gmail.com"
                                className={`option ${
                                  selectedContact === "john@gmail.com"
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleContactSelect("john@gmail.com");
                                }}
                              >
                                john@gmail.com
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="checkout__section">
                    <form
                      className="checkout__item js-tabs-item"
                      style={{
                        display:
                          activePaymentTab === CheckoutPaymentTab.CreditCard
                            ? "block"
                            : "none",
                      }}
                      onSubmit={handleSubmitPayment}
                    >
                      <div className="checkout__line">
                        <div className="checkout__subtitle">Credit Card</div>
                        <div className="checkout__cards">
                          <div className="checkout__card">
                            <img src="img/content/visa.svg" alt="Visa" />
                          </div>
                          <div className="checkout__card">
                            <img
                              src="img/content/master-card.svg"
                              alt="Master Card"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="checkout__fieldset">
                        <div className="field">
                          <div className="field__label">card number</div>
                          <div className="field__wrap">
                            <input
                              className="field__input"
                              type="tel"
                              name="card"
                              placeholder="XXXX XXXX XXXX XXXX"
                              required
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="field__label">card holder</div>
                          <div className="field__wrap">
                            <input
                              className="field__input"
                              type="text"
                              name="holder"
                              placeholder="TRAN MAU TRI TAM"
                              required
                            />
                          </div>
                        </div>
                        <div className="checkout__row">
                          <div className="field">
                            <div className="field__label">EXPIRATION DATE</div>
                            <div className="field__wrap">
                              <input
                                className="field__input"
                                type="tel"
                                name="date"
                                placeholder="MM / YY"
                                required
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="field__label">CVC</div>
                            <div className="field__wrap">
                              <input
                                className="field__input"
                                type="tel"
                                name="cvc"
                                placeholder="CVC"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <label className="checkbox">
                        <input
                          className="checkbox__input"
                          type="checkbox"
                          defaultChecked
                        />
                        <span className="checkbox__inner">
                          <span className="checkbox__tick"></span>
                          <span className="checkbox__text">Save Card</span>
                        </span>
                      </label>
                      <div className="checkout__message">
                        <div className="checkout__category">
                          Message the host
                        </div>
                        <div className="field">
                          <div className="field__wrap">
                            <textarea
                              className="field__textarea"
                              name="message"
                              placeholder="I will be late about 1 hour, please wait..."
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="button checkout__button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Confirm and pay"}
                      </button>
                    </form>

                    <form
                      className="checkout__item js-tabs-item"
                      style={{
                        display:
                          activePaymentTab === CheckoutPaymentTab.PayPal
                            ? "block"
                            : "none",
                      }}
                      onSubmit={handleSubmitPayment}
                    >
                      <div className="checkout__line">
                        <div className="checkout__subtitle">PayPal</div>
                        <div className="checkout__logo">
                          <img src="img/content/paypal.svg" alt="PayPal" />
                        </div>
                      </div>
                      <div className="checkout__fieldset">
                        <div className="field">
                          <div className="field__label">
                            email or phone number
                          </div>
                          <div className="field__wrap">
                            <input
                              className="field__input"
                              type="text"
                              name="login"
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"
                              required
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="field__label">Password</div>
                          <div className="field__wrap">
                            <input
                              className="field__input"
                              type="password"
                              name="password"
                              autoComplete="new-password"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="checkout__control">
                        <button
                          type="submit"
                          className="button checkout__button"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Confirm and pay"}
                        </button>
                        <div className="checkout__verified">
                          <img
                            src="img/content/paypal-verified.png"
                            alt="PayPal"
                          />
                        </div>
                      </div>
                      <label className="checkbox">
                        <input
                          className="checkbox__input"
                          type="checkbox"
                          defaultChecked
                        />
                        <span className="checkbox__inner">
                          <span className="checkbox__tick"></span>
                          <span className="checkbox__text">
                            Save Paypal Account
                          </span>
                        </span>
                      </label>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="price">
            <div className="price__head">
              <div className="price__preview">
                <img src="img/content/photo-1.1.jpg" alt="Price" />
              </div>
              <div className="price__details">
                <div className="price__title">
                  Spectacular views of Queenstown
                </div>
                <div className="price__author">
                  <div className="price__text">Hosted by</div>
                  <div className="price__avatar">
                    <img src="img/content/avatar.jpg" alt="Avatar" />
                  </div>
                  <div className="price__man">Zoe Towne</div>
                </div>
                <div className="price__parameters">
                  <div className="price__parameter">1 private bath</div>
                  <div className="price__parameter">1 bedroom</div>
                </div>
                <div className="price__rating">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="icon-star"
                    className="icon icon-star"
                  >
                    <path d="M9.69 1.529l1.442 2.838 3.238.457c1.517.214 2.211 2.086 1.041 3.192l-2.326 2.198.547 3.098c.28 1.587-1.404 2.653-2.73 1.977L8 13.809l-2.903 1.481c-1.328.678-3.011-.391-2.731-1.976l.547-3.098L.588 8.017C-.582 6.91.114 5.038 1.628 4.824l3.239-.457L6.31 1.529c.697-1.371 2.683-1.372 3.38 0z"></path>
                  </svg>

                  <div className="price__number">4.8</div>
                  <div className="price__reviews">(256 reviews)</div>
                </div>
              </div>
            </div>

            <div className="price__description price__description_flex">
              <div className="price__item">
                <div className="price__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="icon-calendar"
                    className="icon icon-calendar"
                  >
                    <path d="M11.333 1.333c.335 0 .612.247.659.568L12 2l-.001.666h.667a2 2 0 0 1 1.995 1.851l.005.149v8a2 2 0 0 1-1.851 1.995l-.149.005H3.333a2 2 0 0 1-1.995-1.851l-.005-.149v-8a2 2 0 0 1 1.851-1.995l.149-.005h.666L4 2c0-.368.298-.667.667-.667.335 0 .612.247.659.568L5.333 2l-.001.666h5.334V2c0-.368.298-.667.667-.667zM12.666 4l-.667-.001.001.667c0 .368-.298.667-.667.667-.335 0-.612-.247-.659-.568l-.007-.099v-.667H5.332l.001.667c0 .368-.298.667-.667.667-.335 0-.612-.247-.659-.568L4 4.666l-.001-.667L3.333 4c-.368 0-.667.298-.667.667v8c0 .368.298.667.667.667h9.333c.368 0 .667-.298.667-.667v-8c0-.368-.298-.667-.667-.667zm-4 6.667c.368 0 .667.298.667.667 0 .335-.247.612-.568.659L8.666 12h-4C4.298 12 4 11.701 4 11.333c0-.335.247-.612.568-.659l.099-.007h4zM11.333 8c.368 0 .667.298.667.667 0 .335-.247.612-.568.659l-.099.007H6.666c-.368 0-.667-.298-.667-.667 0-.335.247-.612.568-.659L6.666 8h4.667z"></path>
                  </svg>
                </div>
                <div className="price__box">
                  <div className="price__category">Check-in</div>
                  <div className="price__subtitle">
                    {formatDate(booking.checkIn)}
                  </div>
                </div>
              </div>
              <div className="price__item">
                <div className="price__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="icon-calendar"
                    className="icon icon-calendar"
                  >
                    <path d="M11.333 1.333c.335 0 .612.247.659.568L12 2l-.001.666h.667a2 2 0 0 1 1.995 1.851l.005.149v8a2 2 0 0 1-1.851 1.995l-.149.005H3.333a2 2 0 0 1-1.995-1.851l-.005-.149v-8a2 2 0 0 1 1.851-1.995l.149-.005h.666L4 2c0-.368.298-.667.667-.667.335 0 .612.247.659.568L5.333 2l-.001.666h5.334V2c0-.368.298-.667.667-.667zM12.666 4l-.667-.001.001.667c0 .368-.298.667-.667.667-.335 0-.612-.247-.659-.568l-.007-.099v-.667H5.332l.001.667c0 .368-.298.667-.667.667-.335 0-.612-.247-.659-.568L4 4.666l-.001-.667L3.333 4c-.368 0-.667.298-.667.667v8c0 .368.298.667.667.667h9.333c.368 0 .667-.298.667-.667v-8c0-.368-.298-.667-.667-.667zm-4 6.667c.368 0 .667.298.667.667 0 .335-.247.612-.568.659L8.666 12h-4C4.298 12 4 11.701 4 11.333c0-.335.247-.612.568-.659l.099-.007h4zM11.333 8c.368 0 .667.298.667.667 0 .335-.247.612-.568.659l-.099.007H6.666c-.368 0-.667-.298-.667-.667 0-.335.247-.612.568-.659L6.666 8h4.667z"></path>
                  </svg>
                </div>
                <div className="price__box">
                  <div className="price__category">Check-out</div>
                  <div className="price__subtitle">
                    {formatDate(booking.checkOut)}
                  </div>
                </div>
              </div>
              <div className="price__item">
                <div className="price__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="icon-user"
                    className="icon icon-user"
                  >
                    <path d="M8 .668a4 4 0 0 1 4 4c0 1.296-.617 2.449-1.573 3.18 2.104.93 3.573 3.037 3.573 5.487v1.333c0 .368-.298.667-.667.667s-.667-.298-.667-.667v-1.333a4.67 4.67 0 0 0-4.645-4.667H8h0l-.021-.001-.193.006a4.67 4.67 0 0 0-4.453 4.662v1.333c0 .368-.298.667-.667.667S2 15.036 2 14.668v-1.333c0-2.45 1.468-4.557 3.573-5.489C4.617 7.117 4 5.964 4 4.668a4 4 0 0 1 4-4zm0 1.333c-1.473 0-2.667 1.194-2.667 2.667S6.527 7.335 8 7.335s2.667-1.194 2.667-2.667S9.473 2.001 8 2.001z"></path>
                  </svg>
                </div>
                <div className="price__box">
                  <div className="price__category">Guest</div>
                  <div className="price__subtitle">
                    {booking.guests.adults +
                      booking.guests.children +
                      booking.guests.babies}{" "}
                    guest
                    {booking.guests.adults +
                      booking.guests.children +
                      booking.guests.babies !==
                    1
                      ? "s"
                      : ""}
                  </div>
                </div>
              </div>
            </div>

            <div className="price__body">
              <div className="price__stage">Price details</div>
              <div className="price__table">
                <div className="price__row">
                  <div className="price__cell">
                    ${bookingData.pricing.basePrice.toFixed(2)} x{" "}
                    {booking.nights} night{booking.nights !== 1 ? "s" : ""}
                  </div>
                  <div className="price__cell">
                    ${priceBreakdown.subtotal.toFixed(2)}
                  </div>
                </div>
                {priceBreakdown.discount > 0 && (
                  <div className="price__row">
                    <div className="price__cell">
                      {bookingData.pricing.discountPercentage}% campaign
                      discount
                    </div>
                    <div className="price__cell">
                      -${priceBreakdown.discount.toFixed(2)}
                    </div>
                  </div>
                )}
                <div className="price__row">
                  <div className="price__cell">Service fee</div>
                  <div className="price__cell">
                    ${priceBreakdown.serviceFee.toFixed(2)}
                  </div>
                </div>
                <div className="price__row">
                  <div className="price__cell">Cleaning fee</div>
                  <div className="price__cell">
                    ${priceBreakdown.cleaningFee.toFixed(2)}
                  </div>
                </div>
                <div className="price__row">
                  <div className="price__cell">Taxes</div>
                  <div className="price__cell">
                    ${priceBreakdown.taxes.toFixed(2)}
                  </div>
                </div>
                <div className="price__row price__row--total">
                  <div className="price__cell">
                    <strong>Total (USD)</strong>
                  </div>
                  <div className="price__cell">
                    <strong>${priceBreakdown.total.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="price__note">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                id="icon-coin"
                className="icon icon-coin"
              >
                <path d="M8 1.334a6.67 6.67 0 0 1 6.667 6.667A6.67 6.67 0 0 1 8 14.667a6.67 6.67 0 0 1-6.667-6.667A6.67 6.67 0 0 1 8 1.334zm0 1.333c-2.946 0-5.333 2.388-5.333 5.333S5.054 13.334 8 13.334s5.333-2.388 5.333-5.333S10.945 2.667 8 2.667zm0 1.333c.368 0 .667.298.667.667a2 2 0 0 1 2 2c0 .368-.298.667-.667.667s-.667-.298-.667-.667-.298-.667-.667-.667H7.162c-.274 0-.496.222-.496.496 0 .213.137.403.339.47l2.411.804a1.83 1.83 0 0 1-.578 3.564h-.171c0 .368-.298.667-.667.667s-.667-.298-.667-.667a2 2 0 0 1-2-2c0-.368.298-.667.667-.667s.667.298.667.667.298.667.667.667h1.504c.274 0 .496-.222.496-.496 0-.213-.136-.403-.339-.47l-2.411-.804a1.83 1.83 0 0 1 .578-3.564h.171c0-.368.298-.667.667-.667z"></path>
              </svg>
              Free cancellation until 3:00 PM on May 15, 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
