import React from "react";
import cn from "classnames";
import styles from "./Main.module.sass";
import Control from "../../../components/Control";
import Card from "../../../components/Card";
import { useBooking, useStaysList } from "../../../features/stays";

const Main = () => {
  const { savedStayIds, toggleSavedStay } = useBooking();
  const { stays, loading, error, reload } = useStaysList();
  const savedStays = stays.filter((stay) => savedStayIds.includes(stay.id));
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <Control className={styles.control} urlHome="/" breadcrumbs={[{ title: "Home", url: "/" }, { title: "Wishlists" }]} />
        <div className={styles.head}><div className={styles.wrap}><h1 className={cn("h2", styles.title)}>Wishlists</h1><div className={styles.counter}>{savedStays.length} saved stays</div></div></div>
        {loading && <p>Loading saved stays…</p>}
        {error && <><p>We could not load saved stays.</p><button className="button-stroke" type="button" onClick={reload}>Try again</button></>}
        {!loading && !error && savedStays.length === 0 && <p>Your wishlist is empty. Save a stay to find it here.</p>}
        <div className={styles.wrapper}><div className={styles.list}>{savedStays.map((stay) => (
          <div key={stay.id}><Card className={styles.card} item={{ ...stay, url: `/stays-product/${stay.id}` }} /><button className="button-stroke" type="button" onClick={() => toggleSavedStay(stay.id)}>Remove</button></div>
        ))}</div></div>
      </div>
    </div>
  );
};

export default Main;
