import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Item.module.sass";
import Icon from "../../Icon";

const Item = ({ className, item }) => {
  return (
    <Link className={cn(className, styles.item)} to={item.url}>
      <div className={styles.line}>
        {item.number && (
          <div
            className={styles.number}
            style={{ backgroundColor: item.color }}
          >
            {item.number}
          </div>
        )}
        <div className={cn(styles.rating)}>
          <Icon name="star" size="12" />
          {item.rating}
        </div>
      </div>
      <div className={styles.avatar}>
        <img src={item.avatar} alt="Avatar" />
        <div className={styles.check}>
          <Icon name="check" size="12" />
        </div>
      </div>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.location}>{item.location}</div>
    </Link>
  );
};

export default Item;
