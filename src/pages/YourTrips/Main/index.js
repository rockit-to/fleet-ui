import React from "react";
import cn from "classnames";
import styles from "./Main.module.sass";
import Control from "../../../components/Control";
import Card from "../../../components/Card";
import { useBooking } from "../../../features/stays";

const Main = () => {
  const { confirmedBookings } = useBooking();
  return (
    <div className={cn("section-mb64", styles.section)}>
      <div className={cn("container", styles.container)}>
        <Control className={styles.control} urlHome="/" breadcrumbs={[{ title: "Home", url: "/" }, { title: "Your trips" }]} />
        <h1 className={cn("h2", styles.title)}>Your trips</h1>
        {confirmedBookings.length === 0 ? <p>You have no confirmed stays yet.</p> : (
          <div className={styles.list}>
            {confirmedBookings.map((booking) => (
              <Card className={styles.card} item={{ ...booking.stay, url: `/stays-product/${booking.stay.id}` }} key={booking.bookingCode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
