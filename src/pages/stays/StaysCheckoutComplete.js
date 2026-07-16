import React from "react";
import { Navigate } from "react-router-dom";
import cn from "classnames";
import styles from "./StaysCheckoutComplete.module.sass";
import Control from "../../components/Control";
import CheckoutComplete from "../../components/CheckoutComplete";
import { StaysCheckoutSlider as CheckoutSlider } from "../../features/stays";
import { useBooking } from "../../features/stays";

const gallery = [
  {
    src: "/images/content/slider-pic-1.jpg",
    srcSet: "/images/content/slider-pic-1@2x.jpg",
  },
  {
    src: "/images/content/slider-pic-1.jpg",
    srcSet: "/images/content/slider-pic-1@2x.jpg",
  },
  {
    src: "/images/content/slider-pic-1.jpg",
    srcSet: "/images/content/slider-pic-1@2x.jpg",
  },
];

const StaysCheckoutCompletePage = () => {
  const { booking } = useBooking();
  if (!booking?.stay || booking.status !== "confirmed") return <Navigate to="/stays-category" replace />;

  const { stay, checkIn, checkOut, guests, paymentMethod, bookingCode } = booking;
  const nightlyPrice = Number(stay.priceActual?.replace(/[^0-9.]/g, "")) || 0;
  const nights = checkIn && checkOut
    ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000))
    : 7;
  const total = Math.round(nightlyPrice * nights * 1.12);
  const breadcrumbs = [
    { title: stay.title, url: `/stays-product/${stay.id}` },
    { title: "Confirm and pay", url: "/stays-checkout" },
    { title: "Checkout completed" },
  ];
  const parameters = [{ title: "1 bedroom" }, { title: "1 private bath" }];
  const options = [
    { title: "Booking code:", content: bookingCode, icon: "hand-cart" },
    { title: "Dates:", content: checkIn && checkOut ? `${checkIn} – ${checkOut}` : "Flexible dates", icon: "calendar" },
    { title: "Total:", content: `$${total}`, icon: "receipt" },
    { title: "Payment method:", content: paymentMethod, icon: "wallet" },
  ];
  const items = [
    { title: "Dates", content: checkIn && checkOut ? `${checkIn} – ${checkOut}` : "Flexible dates" },
    { title: "Guests", content: `${guests} ${guests === 1 ? "guest" : "guests"}` },
  ];

  return (
    <div className={cn("section-mb80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <Control
          className={styles.control}
          urlHome="/"
          breadcrumbs={breadcrumbs}
        />
        <div className={styles.row}>
          <div className={styles.col}>
            <CheckoutSlider className={styles.slider} gallery={gallery} />
          </div>
          <div className={styles.col}>
            <CheckoutComplete
              className={styles.complete}
              title={stay.title}
              parameters={parameters}
              options={options}
              items={items}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaysCheckoutCompletePage;
