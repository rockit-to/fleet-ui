interface BookingSuccessProps {
  confirmationId: string;
  totalAmount: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  paymentMethod: string;
  contactEmail: string;
}

const BookingSuccess = ({
  confirmationId,
  totalAmount,
  checkIn,
  checkOut,
  guests,
  paymentMethod,
  contactEmail,
}: BookingSuccessProps) => {
  return (
    <div className="checkout__section">
      <div className="checkout__success">
        <div className="checkout__success-header">
          <div className="checkout__success-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="#38A169"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="checkout__success-title">Payment successful</div>
            <div className="checkout__success-subtitle">
              Your booking has been confirmed
            </div>
          </div>
        </div>

        <div className="checkout__success-details">
          <div className="checkout__success-details-title">Booking details</div>
          <div className="checkout__success-details-list">
            <div className="checkout__success-row">
              <span className="checkout__success-label">Confirmation ID</span>
              <span className="checkout__success-value checkout__success-value_bold">
                {confirmationId}
              </span>
            </div>
            <div className="checkout__success-row">
              <span className="checkout__success-label">Total paid</span>
              <span className="checkout__success-value checkout__success-value_bold">
                {totalAmount}
              </span>
            </div>
            <div className="checkout__success-row">
              <span className="checkout__success-label">Check-in</span>
              <span className="checkout__success-value">{checkIn}</span>
            </div>
            <div className="checkout__success-row">
              <span className="checkout__success-label">Check-out</span>
              <span className="checkout__success-value">{checkOut}</span>
            </div>
            <div className="checkout__success-row">
              <span className="checkout__success-label">Guests</span>
              <span className="checkout__success-value">
                {guests} {guests === 1 ? "guest" : "guests"}
              </span>
            </div>
            <div className="checkout__success-row">
              <span className="checkout__success-label">Payment method</span>
              <span className="checkout__success-value">{paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="checkout__success-note">
          A confirmation email has been sent to{" "}
          <strong>{contactEmail}</strong>. You can view your booking details
          anytime from your account.
        </div>
      </div>
    </div>
  );
};

export { BookingSuccess };
