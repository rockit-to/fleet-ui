import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Travelers.module.sass";
import Icon from "../Icon";
import Counter from "../Counter";

const Travelers = ({
  className,
  title,
  description,
  icon,
  small,
  bodyDown,
  value,
  onChange,
}) => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);

  const [visible, setVisible] = useState(false);

  const travelerCounts = value ?? { adults, children, babies };
  const updateCount = (key, nextValue) => {
    if (value === undefined) {
      if (key === "adults") setAdults(nextValue);
      if (key === "children") setChildren(nextValue);
      if (key === "babies") setAdults(nextValue);
    }
    onChange?.({ ...travelerCounts, [key]: nextValue });
  };

  const items = [
    {
      title: "Adults",
      content: "Ages 13 or above",
      value: travelerCounts.adults,
      setValue: (nextValue) => updateCount("adults", nextValue),
    },
    {
      title: "Children",
      content: "Ages 2 - 12",
      value: travelerCounts.children,
      setValue: (nextValue) => updateCount("children", nextValue),
    },
    {
      title: "Babies",
      content: "Under 2",
      value: travelerCounts.babies,
      setValue: (nextValue) => updateCount("babies", nextValue),
    },
  ];

  const renderTitle = () => {
    const sum = travelerCounts.adults + travelerCounts.children + travelerCounts.babies;
    return sum > 0
      ? sum > 1
        ? sum + " guests"
        : sum + " guest"
      : title;
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(
          className,
          styles.travelers,
          { [styles.small]: small },
          { [styles.bodyDown]: bodyDown },
          {
            [styles.active]: visible,
          }
        )}
      >
        <div className={styles.head}>
          <div className={styles.icon}>
            <Icon name={icon} size="24" />
          </div>
          <div className={styles.content} onClick={() => setVisible(true)}>
            {renderTitle()}
          </div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
        </div>
        <div className={styles.body}>
          {items.map((x, index) => (
            <div className={styles.box} key={index}>
              <div className={styles.details}>
                <div className={styles.category}>{x.title}</div>
                <div className={styles.text}>{x.content}</div>
              </div>
              <Counter
                className={styles.counter}
                value={x.value}
                setValue={x.setValue}
                iconMinus="minus-circle"
                iconPlus="plus-circle"
              />
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Travelers;
