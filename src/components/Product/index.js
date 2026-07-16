import React from "react";
import cn from "classnames";
import styles from "./Product.module.sass";
import Control from "../Control";
import Icon from "../Icon";
import Actions from "../Actions";
import Gallery from "./Gallery";

const Product = ({
  classSection,
  urlHome,
  breadcrumbs,
  title,
  options,
  gallery,
  type,
  stayId,
  rating,
  reviews,
}) => {
  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn("container", styles.container)}>
        <Control
          className={styles.control}
          urlHome={urlHome}
          breadcrumbs={breadcrumbs}
        />
        <div className={styles.head}>
          <div className={styles.box}>
            <h1 className={cn("h2", styles.title)}>{title}</h1>
            <div className={styles.line}>
              <div className={styles.avatar}>
                <img src="/images/content/avatar-1.jpg" alt="Avatar" />
              </div>
              <div className={styles.rating}>
                <Icon name="star" size="20" />
                <div className={styles.number}>{rating || "4.8"}</div>
                <div className={styles.reviews}>({reviews || "256"} reviews)</div>
              </div>
              <div className={styles.options}>
                {options.map((x, index) => (
                  <div className={styles.option} key={index}>
                    <Icon name={x.icon} size="20" />
                    {x.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Actions className={styles.actions} />
        </div>
        {gallery && (
          <Gallery className={styles.gallery} items={gallery} type={type} stayId={stayId} />
        )}
      </div>
    </div>
  );
};

export default Product;
