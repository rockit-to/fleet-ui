import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Location.module.sass";
import Icon from "../Icon";

const items = [
  "New York, NY",
  "New York, Manhattan, New York, NY",
  "New Zealand",
  "New Smyrna Beach, FL",
  "Newark, NJ",
];

const Location = ({
  className,
  icon,
  description,
  placeholder,
  small,
  bodyDown,
  value,
  onChange,
}) => {
  const [visible, setVisible] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const inputValue = value ?? internalValue;

  const updateValue = (nextValue) => {
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(
          className,
          styles.location,
          { [styles.small]: small },
          { [styles.bodyDown]: bodyDown },
          { [styles.active]: visible }
        )}
      >
        <div className={styles.head}>
          <div className={styles.icon}>
            <Icon name={icon} size="24" />
          </div>
          <input
            className={styles.input}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(event) => {
              updateValue(event.target.value);
              setVisible(true);
            }}
          />
          {description && (
            <div className={styles.description}>{description}</div>
          )}
          <button
            className={styles.clear}
            type="button"
            onClick={() => {
              updateValue("");
              setVisible(false);
            }}
          >
            <Icon name="close-circle" size="24" />
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.list}>
            {items.map((x) => (
              <button
                className={styles.item}
                type="button"
                key={x}
                onClick={() => {
                  updateValue(x);
                  setVisible(false);
                }}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Location;
