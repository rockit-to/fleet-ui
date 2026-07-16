import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Details.module.sass";
import Icon from "../../../../components/Icon";

const options = [
  {
    title: "Lives in",
    content: "Auckland, New Zealand",
    icon: "home",
  },
  {
    title: "Date:",
    url: "/stays",
    content: "Get direction",
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
      <div className={styles.title}>About Zoe Towne</div>
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
            {x.url ? (
              <Link className={cn(styles.text, styles.link)} to={x.url}>
                {x.content}
              </Link>
            ) : (
              <div className={styles.text}>{x.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
