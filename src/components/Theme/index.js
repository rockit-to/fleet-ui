import React from "react";
import cn from "classnames";
import styles from "./Theme.module.sass";
import useDarkMode from "use-dark-mode";

const Theme = ({ className }) => {
  // A new Fleet-specific key intentionally starts every session in light
  // mode, rather than inheriting a stale generic `darkMode` preference.
  const darkMode = useDarkMode(false, { storageKey: "fleet-theme-v2", global: { matchMedia: () => ({ media: "", matches: false, addListener: () => {}, removeListener: () => {} }), document: window.document } });

  return (
    <label className={cn(className, styles.theme)}>
      <input
        className={styles.input}
        checked={darkMode.value}
        onChange={darkMode.toggle}
        type="checkbox"
      />
      <span className={styles.inner}>
        <span className={styles.box}></span>
      </span>
    </label>
  );
};

export default Theme;
