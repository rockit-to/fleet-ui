import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Item.module.sass";
import Icon from "../../Icon";

const Item = ({ className, item }) => {
  return (
    <Link className={cn(className, styles.item)} to={item.url}>
      <div className={cn("status", styles.counter)}>{item.counter}</div>
      <div className={styles.icon}>
        <Icon name={item.icon} size="32" />
      </div>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.content}>{item.content}</div>
    </Link>
  );
};

export default Item;
