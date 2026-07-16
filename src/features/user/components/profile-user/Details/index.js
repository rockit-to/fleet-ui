import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Details.module.sass";
import Icon from "../../../../../components/Icon";

const options = [
  {
    title: "Lives in",
    content: "Auckland, New Zealand",
    icon: "home",
  },
  {
    title: "Account",
    content: "Verified member",
    icon: "route",
  },
  {
    title: "Speak",
    content: "English, Vietnamese",
    icon: "comment",
  },
];

const Details = ({ className }) => {
  return (
    <div className={cn(className, styles.details)}>
      <div className={styles.head}>
        <div className={styles.welcome}>Hi, I'm Kohaku Tora</div>
        <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/account-settings"
        >
          Edit your profile
        </Link>
      </div>
      <div className={styles.content}>
        Described by Queenstown House & Garden magazine as having 'one of the
        best views we've ever seen' you will love relaxing in this newly built
      </div>
      <div className={styles.options}>
        {options.map((x, index) => (
          <div className={styles.option} key={index}>
            <div className={styles.category}>
              <Icon name={x.icon} size="20" />
              {x.title}
            </div>
            <div className={styles.text}>{x.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
