import React from "react";
import cn from "classnames";
import styles from "./Main.module.sass";
import Control from "../../../components/Control";
import Card from "../../../components/Card";
import { useBooking } from "../../../features/stays";

const Main = () => {
  const { confirmedBookings } = useBooking();
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <Control className={styles.control} urlHome="/" breadcrumbs={[{ title: "Home", url: "/" }, { title: "Bookings" }]} />
        <div className={styles.head}><h1 className={cn("h2", styles.title)}>Bookings</h1><div className={styles.counter}>{confirmedBookings.length} confirmed bookings</div></div>
        {confirmedBookings.length === 0 ? <p>No guest bookings have been confirmed yet.</p> : <div className={styles.wrapper}><div className={styles.list}>
          {confirmedBookings.map((booking) => <Card className={styles.card} item={{ ...booking.stay, url: `/stays-product/${booking.stay.id}` }} key={booking.bookingCode} />)}
        </div></div>}
      </div>
    </div>
  );
};

export default Main;
