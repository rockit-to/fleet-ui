import React, { useState } from "react";
import cn from "classnames";
import styles from "./PayPal.module.sass";
import TextInput from "../../TextInput";
import Checkbox from "../../Checkbox";

const PayPal = ({ className, onConfirm }) => {
  const [save, setSave] = useState(true);

  return (
    <form className={cn(className, styles.paypal)} onSubmit={(event) => { event.preventDefault(); onConfirm?.(); }}>
      <div className={styles.line}>
        <div className={styles.subtitle}>Login to Paypal</div>
        <div className={styles.logo}>
          <img src="/images/content/paypal.svg" alt="PayPal" />
        </div>
      </div>
      <div className={styles.fieldset}>
        <TextInput
          className={styles.field}
          label="email or phone number"
          name="login"
          type="email"
          required
        />
        <TextInput
          className={styles.field}
          label="Password"
          name="password"
          type="password"
          required
        />
      </div>
      <div className={styles.control}>
        <button className={cn("button", styles.button)} type="submit">
          Confirm and pay
        </button>
        <div className={styles.verified}>
          <img src="/images/content/paypal-verified.png" alt="PayPal" />
        </div>
      </div>
      <Checkbox
        className={styles.checkbox}
        value={save}
        onChange={() => setSave(!save)}
        content="Save Paypal Account"
      />
    </form>
  );
};

export default PayPal;
