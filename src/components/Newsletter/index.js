import React, { useState } from "react";
import cn from "classnames";
import styles from "./Newsletter.module.sass";
import Image from "../Image";
import Form from "../Form";

const gallery = [
  {
    src: "/images/content/newsletter-pic-1.png",
    srcSet: "/images/content/newsletter-pic-1@2x.png",
    srcDark: "/images/content/newsletter-pic-dark-1.png",
    srcSetDark: "/images/content/newsletter-pic-dark-1@2x.png",
  },
  {
    src: "/images/content/newsletter-pic-2.png",
    srcSet: "/images/content/newsletter-pic-2@2x.png",
    srcDark: "/images/content/newsletter-pic-dark-2.png",
    srcSetDark: "/images/content/newsletter-pic-dark-2@2x.png",
  },
  {
    src: "/images/content/newsletter-pic-3.png",
    srcSet: "/images/content/newsletter-pic-3@2x.png",
    srcDark: "/images/content/newsletter-pic-dark-3.png",
    srcSetDark: "/images/content/newsletter-pic-dark-3@2x.png",
  },
  {
    src: "/images/content/newsletter-pic-4.png",
    srcSet: "/images/content/newsletter-pic-4@2x.png",
    srcDark: "/images/content/newsletter-pic-dark-4.png",
    srcSetDark: "/images/content/newsletter-pic-dark-4@2x.png",
  },
];

const items = [
  {
    title: "Get more discount",
    color: "#58C27D",
  },
  {
    title: "Get premium travel magazine",
    color: "#92A5EF",
  },
];

const Newsletter = ({ classSection, title }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className={cn("section", classSection, styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrap}>
          <h2 className={cn("h2", styles.title)}>
            Join our newsletter{" "}
            <span role="img" aria-label="firework">
              🎉
            </span>
          </h2>
          <div className={styles.info}>
            Stacks is a production-ready library of stackable content blocks
            built in React Native.
          </div>
          <div className={styles.list}>
            {items.map((x, index) => (
              <div className={styles.item} key={index}>
                <div
                  className={styles.number}
                  style={{ backgroundColor: x.color }}
                >
                  0{index + 1}
                </div>
                <div className={styles.text}>{x.title}</div>
              </div>
            ))}
          </div>
          <Form
            className={styles.form}
            value={email}
            setValue={setEmail}
            onSubmit={() => handleSubmit()}
            placeholder="Enter your email"
            type="email"
            name="email"
            icon="arrow-next"
          />
          {submitted && <div className={styles.info}>You’re subscribed with {email}.</div>}
        </div>
        <div className={styles.gallery}>
          {gallery.map((x, index) => (
            <div className={styles.preview} key={index}>
              <Image
                srcSet={`${x.srcSet} 2x`}
                srcSetDark={`${x.srcSetDark} 2x`}
                src={x.src}
                srcDark={x.srcDark}
                alt="Newsletter"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
