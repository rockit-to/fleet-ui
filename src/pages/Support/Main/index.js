import React, { useState } from "react";
import cn from "classnames";
import styles from "./Main.module.sass";
import Image from "../../../components/Image";
import Form from "../../../components/Form";
import { useNavigate } from "react-router-dom";

const gallery = [
  {
    src: "/images/content/support-pic-1.png",
    srcSet: "/images/content/support-pic-1@2x.png",
    srcDark: "/images/content/support-pic-dark-1.png",
    srcSetDark: "/images/content/support-pic-dark-1@2x.png",
  },
  {
    src: "/images/content/support-pic-2.png",
    srcSet: "/images/content/support-pic-2@2x.png",
    srcDark: "/images/content/support-pic-dark-2.png",
    srcSetDark: "/images/content/support-pic-dark-2@2x.png",
  },
  {
    src: "/images/content/support-pic-3.png",
    srcSet: "/images/content/support-pic-3@2x.png",
    srcDark: "/images/content/support-pic-dark-3.png",
    srcSetDark: "/images/content/support-pic-dark-3@2x.png",
  },
  {
    src: "/images/content/support-pic-4.png",
    srcSet: "/images/content/support-pic-4@2x.png",
    srcDark: "/images/content/support-pic-dark-4.png",
    srcSetDark: "/images/content/support-pic-dark-4@2x.png",
  },
];

const Main = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    navigate(`/messages${search.trim() ? `?support=${encodeURIComponent(search.trim())}` : ""}`);
  };

  return (
    <div className={styles.section}>
      <div className={cn("container", styles.container)}>
        <div className={styles.gallery}>
          {gallery.map((x, index) => (
            <div className={styles.preview} key={index}>
              <Image
                srcSet={`${x.srcSet} 2x`}
                srcSetDark={`${x.srcSetDark} 2x`}
                src={x.src}
                srcDark={x.srcDark}
                alt="Support"
              />
            </div>
          ))}
        </div>
        <h1 className={cn("hero", styles.title)}>Support</h1>
        <div className={styles.info}>
          Stacks is a production-ready library of stackable content blocks built
          in React Native.
        </div>
        <Form
          className={styles.form}
          big
          value={search}
          setValue={setSearch}
          onSubmit={() => handleSubmit()}
          placeholder="Search anything"
          type="text"
          name="search"
          icon="search"
        />
      </div>
    </div>
  );
};

export default Main;
