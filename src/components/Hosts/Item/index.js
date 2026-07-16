import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Item.module.sass";
import Icon from "../../Icon";

const Item = ({ className, item }) => {
  return (
    <Link className={cn(className, styles.item)} to={item.url}>
      <div className={styles.preview}>
        <img srcSet={`${item.srcSet} 2x`} src={item.src} alt="Host" />
        <div className={cn(styles.rating)}>
          <Icon name="star" size="12" />
          {item.rating}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.avatar}>
          <img src={item.avatar} alt="Avatar" />
        </div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.location}>{item.location}</div>
      </div>
    </Link>
  );
};

export default Item;
