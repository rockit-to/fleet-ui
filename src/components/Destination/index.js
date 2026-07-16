import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Destination.module.sass";

const Destination = ({ className, item }) => {
  return (
    <Link className={cn(className, styles.destination)} to={item.url}>
      <div className={styles.preview}>
        <img srcSet={`${item.srcSet} 2x`} src={item.src} alt="City" />
        {item.categoryText && (
          <div
            className={cn("status", styles.category, {
              "status-black": item.category === "black",
            })}
          >
            {item.categoryText}
          </div>
        )}
      </div>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.content}>{item.content}</div>
    </Link>
  );
};

export default Destination;
