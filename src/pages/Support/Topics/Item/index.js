import React from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import { Link } from "react-router-dom";

const Item = ({ className, item }) => {
  return (
    <Link className={cn(className, styles.item)} to={`/messages?support=${encodeURIComponent(item.title)}`}>
      <div className={styles.icon}>
        <img src={item.image} alt="Topics" />
      </div>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.content}>{item.content}</div>
    </Link>
  );
};

export default Item;
