import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Notification.module.sass";
import Icon from "../../Icon";

const items = [
  {
    title: "Kohaku Tora",
    content: "just sent you a message",
    date: "1 minute ago",
    color: "#3B71FE",
    avatar: "/images/content/avatar-1.jpg",
    url: "/messages",
  },
  {
    title: "Kohaku Tora",
    content: "just sent you a message",
    date: "30 minute ago",
    color: "#3B71FE",
    avatar: "/images/content/avatar-1.jpg",
    url: "/messages",
  },
];

const Notification = ({ className }) => {
  const [visible, setVisible] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.notification, className, {
          [styles.active]: visible,
        })}
      >
        <button
          className={cn(styles.head, styles.active)}
          onClick={() => setVisible(!visible)}
        >
          <Icon name="notification" size="24" />
        </button>
        <div className={styles.body}>
          <div className={styles.title}>Notification</div>
          <div className={styles.list}>
            {items.map((x, index) => (
              <Link
                className={styles.item}
                to={x.url}
                onClick={() => setVisible(!visible)}
                key={index}
              >
                <div className={styles.avatar}>
                  <img src={x.avatar} alt="Avatar" />
                </div>
                <div className={styles.details}>
                  <div className={styles.subtitle}>{x.title}</div>
                  <div className={styles.content}>{x.content}</div>
                  <div className={styles.date}>{x.date}</div>
                </div>
                <div
                  className={styles.status}
                  style={{ backgroundColor: x.color }}
                ></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Notification;
