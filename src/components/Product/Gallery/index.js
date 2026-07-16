import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Gallery.module.sass";
import Icon from "../../Icon";
import PhotoView from "../../PhotoView";

const Gallery = ({ className, items, type, stayId }) => {
  const [initialSlide, setInitialSlide] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleOpen = (index) => {
    setInitialSlide(index);
    setVisible(true);
  };

  return (
    <>
      <div className={cn(styles.gallery, className)}>
        <div
          className={cn(
            styles.list,
            {
              [styles.stays]: type === "stays",
            },
            {
              [styles.cars]: type === "cars",
            },
            {
              [styles.tour]: type === "tour",
            }
          )}
        >
          {items.map((x, index) =>
            index > 0 ? (
              <div
                className={styles.preview}
                key={index}
                onClick={() => handleOpen(index)}
              >
                <img src={x} alt="Product Details"></img>
              </div>
            ) : (
              <div className={styles.preview} key={index}>
                <div className={styles.view} onClick={() => handleOpen(index)}>
                  <img src={x} alt="Product Details"></img>
                </div>
                <Link
                  to={stayId ? `/full-photo/${stayId}` : "/full-photo"}
                  className={cn("button-white button-small", styles.button)}
                >
                  <Icon name="image" size="16" />
                  <span>Show all photos</span>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
      <PhotoView
        title="Spectacular views of Queenstown"
        initialSlide={initialSlide}
        visible={visible}
        items={items}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default Gallery;
