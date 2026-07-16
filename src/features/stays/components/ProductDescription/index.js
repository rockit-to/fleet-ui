import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProductDescription.module.sass";
import Icon from "../../../../components/Icon";
import Details from "./Details";
import Receipt from "../../../../components/Receipt";
import { useBooking } from "../../booking/BookingContext";

function stayPrice(stay) {
  return Number(stay.priceActual?.replace(/[^0-9.]/g, "")) || 0;
}

function numberOfNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 7;
  const difference = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(1, Math.round(difference / 86_400_000));
}

const ProductDescription = ({ classSection, stay, checkIn, checkOut, guests, onReserve }) => {
  const nights = numberOfNights(checkIn, checkOut);
  const nightlyPrice = stayPrice(stay);
  const subtotal = nightlyPrice * nights;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;
  const formatMoney = (amount) => `$${amount}`;
  const items = [
    { title: checkIn || "Choose dates", category: "Check-in", icon: "calendar" },
    { title: checkOut || "Choose dates", category: "Check-out", icon: "calendar" },
    { title: `${guests || 1} ${guests === 1 ? "guest" : "guests"}`, category: "Guest", icon: "user" },
  ];
  const receipt = [
    { title: `${formatMoney(nightlyPrice)} x ${nights} nights`, content: formatMoney(subtotal) },
    { title: "Service fee", content: formatMoney(serviceFee) },
    { title: "Total", content: formatMoney(total) },
  ];
  const { savedStayIds, toggleSavedStay } = useBooking();
  const [reported, setReported] = useState(false);
  const isSaved = savedStayIds.includes(stay.id);

  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrapper}>
          <Details className={styles.details} stay={stay} />
          <Receipt
            className={styles.receipt}
            items={items}
            priceOld={stay.priceOld}
            priceActual={stay.priceActual}
            time="night"
          >
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)} type="button" onClick={() => toggleSavedStay(stay.id)}>
                <span>{isSaved ? "Saved" : "Save"}</span>
                <Icon name="plus" size="16" />
              </button>
              <button
                className={cn("button", styles.button)}
                type="button"
                onClick={onReserve}
              >
                <span>Reserve</span>
                <Icon name="bag" size="16" />
              </button>
            </div>
            <div className={styles.table}>
              {receipt.map((x, index) => (
                <div className={styles.line} key={index}>
                  <div className={styles.cell}>{x.title}</div>
                  <div className={styles.cell}>{x.content}</div>
                </div>
              ))}
            </div>
            <div className={styles.foot}>
              <button className={styles.report} type="button" onClick={() => setReported(true)} disabled={reported}>
                <Icon name="flag" size="12" />
                {reported ? "Report received" : "Report this property"}
              </button>
            </div>
          </Receipt>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
