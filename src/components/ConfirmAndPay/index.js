import React, { useState } from "react";
import cn from "classnames";
import styles from "./ConfirmAndPay.module.sass";
import CreditCard from "./CreditCard";
import PayPal from "./PayPal";
import Icon from "../Icon";
import Dropdown from "../Dropdown";

const nav = ["Credit Card", "Paypal"];

const logins = ["tam@ui8.net", "vova@ui8.net", "john@ui8.net"];

const ConfirmAndPay = ({ className, guests, title, dates, guestsCount, onConfirm }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [login, setLogin] = useState(logins[0]);

  return (
    <div className={cn(className, styles.confirm)}>
      <div className={cn("h2", styles.title)}>Confirm and pay</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.box}>
            <div className={styles.category}>{title}</div>
            <div className={styles.group}>
              <div className={styles.option}>
                <div className={styles.info}>Dates</div>
                <input className={styles.input} type="text" />
                <div className={styles.value}>{dates || "Choose dates"}</div>
                <button className={styles.edit}>
                  <Icon name="edit" size="24" />
                </button>
              </div>
              {guests && (
                <div className={styles.option}>
                  <div className={styles.info}>Guests</div>
                  <input className={styles.input} type="text" />
                  <div className={styles.value}>{`${guestsCount || 1} ${(guestsCount || 1) === 1 ? "guest" : "guests"}`}</div>
                  <button className={styles.edit}>
                    <Icon name="edit" size="24" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.top}>
              <div className={styles.category}>Pay with</div>
              <div className={styles.nav}>
                {nav.map((x, index) => (
                  <button
                    className={cn(styles.link, {
                      [styles.active]: index === activeIndex,
                    })}
                    key={index}
                    onClick={() => setActiveIndex(index)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>saved contact info</div>
              <Dropdown
                className={styles.dropdown}
                value={login}
                setValue={setLogin}
                options={logins}
              />
            </div>
          </div>
        </div>
        <div className={styles.item}>
          {activeIndex === 0 && (
            <CreditCard className={styles.credit} onConfirm={() => onConfirm?.("Credit card")} />
          )}
          {activeIndex === 1 && (
            <PayPal className={styles.paypal} onConfirm={() => onConfirm?.("PayPal")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmAndPay;
