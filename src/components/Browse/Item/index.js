import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Item.module.sass";
import Icon from "../../Icon";

const Item = ({ className, item }) => {
  return (
    <Link className={cn(className, styles.item)} to={item.url}>
      <div className={styles.preview}>
        <img srcSet={`${item.srcSet} 2x`} src={item.src} alt="Nature" />
        <div
          className={cn(
            { "status-black": item.category === "black" },
            styles.category
          )}
        >
          {item.categoryText}
        </div>
      </div>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.counter}>
        <Icon name="home" size="16" />
        {item.counter}
      </div>
    </Link>
  );
};

export default Item;
