import React from "react";
import cn from "classnames";
import styles from "./LoginAndSecurity.module.sass";

const LoginAndSecurity = () => {
  return (
    <div className={styles.section}>
      <div className={cn("h2", styles.title)}>Login and security</div>
      <div className={styles.list}>
        <div className={styles.box}>
          <div className={styles.category}>Login</div>
          <div className={styles.item}>
            <div className={styles.details}>
              <div className={styles.label}>Password</div>
              <div className={styles.text}>Last updated 1 month ago</div>
            </div>
            <button className={cn("button-stroke button-small", styles.button)}>
              Update password
            </button>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.category}>Social accounts</div>
          <div className={styles.row}>
            <div className={styles.item}>
              <div className={styles.details}>
                <div className={styles.label}>Facebook</div>
                <div className={styles.text}>Not connected</div>
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Connect
              </button>
            </div>
            <div className={styles.item}>
              <div className={styles.details}>
                <div className={styles.label}>Apple account</div>
                <div className={styles.text}>Not connected</div>
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.category}>Device history</div>
          <div className={styles.group}>
            <div className={styles.item}>
              <div className={styles.details}>
                <div className={styles.label}>Session</div>
                <div className={styles.text}>May 14, 2021 at 08:36pm</div>
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Log out device
              </button>
            </div>
            <div className={styles.item}>
              <div className={styles.details}>
                <div className={styles.label}>macOs Big Sur. Chrome</div>
                <div className={styles.text}>May 14, 2021 at 08:36pm</div>
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Log out device
              </button>
            </div>
            <div className={styles.item}>
              <div className={styles.details}>
                <div className={styles.label}>Session</div>
                <div className={styles.text}>May 14, 2021 at 08:36pm</div>
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Log out device
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSecurity;
