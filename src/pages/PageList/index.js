import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./PageList.module.sass";

const PageList = () => {
  return (
    <div className={styles.page}>
      <div className={cn("container", styles.container)}>
        <p>
          <Link to="/">Stays</Link>
        </p>
        <p>
          <Link to="/stays-category">Stays Category</Link>
        </p>
        <p>
          <Link to="/stays-product">Stays Product Details</Link>
        </p>
        <p>
          <Link to="/stays-checkout">Stays Checkout</Link>
        </p>
        <p>
          <Link to="/stays-checkout-complete">Stays Checkout Complete</Link>
        </p>
        <p>
          <Link to="/full-photo">Full Photo Grid</Link>
        </p>
        <p style={{ marginTop: 40 }}>
          <Link to="/support">Support</Link>
        </p>
        <p>
          <Link to="/host-profile">Host profile</Link>
        </p>
        <p>
          <Link to="/profile">User profile</Link>
        </p>
        <p>
          <Link to="/account-settings">Account Settings</Link>
        </p>
        <p>
          <Link to="/messages">Message Center</Link>
        </p>
        <p>
          <Link to="/wishlists">Wishlists</Link>
        </p>
        <p>
          <Link to="/your-trips">Your Trips</Link>
        </p>
        <p>
          <Link to="/bookings">Bookings</Link>
        </p>
        <p>
          <Link to="/list-your-property">List your property</Link>
        </p>
      </div>
    </div>
  );
};

export default PageList;
