import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./StaysCheckout.module.sass";
import Control from "../../components/Control";
import ConfirmAndPay from "../../components/ConfirmAndPay";
import PriceDetails from "../../components/PriceDetails";
import { useBooking } from "../../features/stays";

const StaysCheckoutPage = () => {
  const navigate = useNavigate();
  const { booking, completeBooking } = useBooking();
  if (!booking?.stay) return <Navigate to="/stays-category" replace />;

  const { stay, checkIn, checkOut, guests } = booking;
  const nights = checkIn && checkOut
    ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000))
    : 7;
  const nightlyPrice = Number(stay.priceOld?.replace(/[^0-9.]/g, "")) || 0;
  const subtotal = nightlyPrice * nights;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;
  const formatMoney = (amount) => `$${amount}`;
  const items = [
    { title: checkIn || "Flexible", category: "Check-in", icon: "calendar" },
    { title: checkOut || "Flexible", category: "Check-out", icon: "calendar" },
    { title: `${guests} ${guests === 1 ? "guest" : "guests"}`, category: "Guest", icon: "user" },
  ];
  const table = [
    { title: `${formatMoney(nightlyPrice)} x ${nights} nights`, value: formatMoney(subtotal) },
    { title: "Service fee", value: formatMoney(serviceFee) },
    { title: "Total (USD)", value: formatMoney(total) },
  ];
  const dates = checkIn && checkOut ? `${checkIn} – ${checkOut}` : "Flexible dates";
  const confirm = (paymentMethod) => {
    completeBooking(paymentMethod);
    navigate("/stays-checkout-complete");
  };
  const breadcrumbs = [
    { title: stay.title, url: `/stays-product/${stay.id}` },
    { title: "Confirm and pay" },
  ];

  return (
    <div className={cn("section-mb80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <Control
          className={styles.control}
          urlHome={`/stays-product/${stay.id}`}
          breadcrumbs={breadcrumbs}
        />
        <div className={styles.wrapper}>
          <ConfirmAndPay
            className={styles.confirm}
            title="Your trip"
            guests
            dates={dates}
            guestsCount={guests}
            onConfirm={confirm}
          />
          <PriceDetails
            className={styles.price}
            more
            image={stay.src}
            title={stay.title}
            items={items}
            table={table}
          />
        </div>
      </div>
    </div>
  );
};

export default StaysCheckoutPage;
