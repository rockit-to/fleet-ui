import React from "react";
import cn from "classnames";
import styles from "./Main.module.sass";
import Profile from "../../../components/Profile";
import Icon from "../../../components/Icon";
import Details from "./Details";
import List from "./List";
import Comment from "../../../components/Comment";

const parametersUser = [
  {
    title: "Superhost",
    icon: "home",
  },
  {
    title: "256 reviews",
    icon: "star-outline",
  },
];

const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/ui8.net/",
  },
];

const Main = () => {
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.photo}>
          <img src="/images/content/bg-profile-host.jpg" alt="Nature" />
        </div>
        <div className={styles.row}>
          <Profile
            className={styles.profile}
            parametersUser={parametersUser}
            socials={socials}
            buttonText="Contact"
          >
            <div className={styles.line}>
              <div className={styles.avatar}>
                <img src="/images/content/avatar.jpg" alt="Avatar" />
                <div className={styles.check}>
                  <Icon name="tick" size="24" />
                </div>
              </div>
              <div className={styles.description}>
                <div className={styles.man}>Zoe towne</div>
                <div className={styles.rating}>
                  <Icon name="star" size="20" />
                  <div className={styles.number}>4.8</div>
                  <div className={styles.reviews}>(256 reviews)</div>
                </div>
              </div>
            </div>
          </Profile>
          <div className={styles.wrapper}>
            <Details className={styles.details} />
            <List className={styles.list} />
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
