import React from "react";
import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "../../../../../components/Icon";

const Details = ({ className, stay }) => {
  const isUserPublished = stay && stay.rating === "New";
  const parameters = [];
  if (stay?.bedRoom) parameters.push({ title: `${stay.bedRoom} bedroom${stay.bedRoom !== "1" ? "s" : ""}`, icon: "flag" });
  if (stay?.livingRoom) parameters.push({ title: `${stay.livingRoom} living room${stay.livingRoom !== "1" ? "s" : ""}`, icon: "home" });
  if (stay?.kitchen) parameters.push({ title: `${stay.kitchen} kitchen${stay.kitchen !== "1" ? "s" : ""}`, icon: "flag" });
  if (parameters.length === 0) {
    parameters.push({ title: "2 guests", icon: "home" });
    parameters.push({ title: "1 bedroom", icon: "flag" });
    parameters.push({ title: "1 private bath", icon: "flag" });
  }

  return (
    <div className={cn(className, styles.details)}>
      <h4 className={cn("h4", styles.title)}>{stay?.title || "Private room in house"}</h4>
      <div className={styles.profile}>
        <span>Hosted by</span>
        <div className={styles.avatar}>
          <img src="/images/content/avatar.jpg" alt="Avatar" />
        </div>
        <div className={styles.name}>{isUserPublished ? "You" : "Zoe Towne"}</div>
      </div>
      <div className={styles.parameters}>
        {parameters.map((x, index) => (
          <div className={styles.parameter} key={index}>
            <Icon name={x.icon} size="20" />
            {x.title}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        {stay?.description ? (
          <p>{stay.description}</p>
        ) : (
          <>
            <p>
              Described by Queenstown House & Garden magazine as having 'one of the
              best views we've ever seen' you will love relaxing in this newly
              built, architectural house sitting proudly on Queenstown Hill.
            </p>
            <p>
              Enjoy breathtaking 180' views of Lake Wakatipu from your well
              appointed & privately accessed bedroom with modern en suite and
              floor-to-ceiling windows.
            </p>
            <p>
              Your private patio takes in the afternoon sun, letting you soak up
              unparalleled lake and mountain views by day and the stars & city
              lights by night.
            </p>
          </>
        )}
      </div>
      <button className={cn("button-stroke button-small", styles.button)}>
        More detail
      </button>
    </div>
  );
};

export default Details;
