import React, { useState } from "react";
import cn from "classnames";
import styles from "./MessageCenter.module.sass";
import Users from "./Users";
import Messages from "./Messages";
import Location from "./Location";

const users = [
  {
    id: 0,
    man: "Antone Heller",
    rating: "4.9",
    avatar: "/images/content/avatar-1.jpg",
    date: "12 May, 2021",
    message: "Thanks. It means a lot to me. Thanks. It means a lot to me...",
  },
  {
    id: 1,
    man: "Jessyca Klocko",
    rating: "5.0",
    avatar: "/images/content/avatar-2.jpg",
    date: "12 May, 2021",
    message: "Thanks. It means a lot to me. Thanks. It means a lot to me...",
  },
  {
    id: 2,
    man: "Alanna Nader",
    rating: "4.0",
    avatar: "/images/content/avatar-3.jpg",
    date: "12 May, 2021",
    message: "Thanks. It means a lot to me. Thanks. It means a lot to me...",
  },
  {
    id: 3,
    man: "Monty Schmeler",
    rating: "4.9",
    avatar: "/images/content/avatar-4.jpg",
    date: "12 May, 2021",
    message: "Thanks. It means a lot to me. Thanks. It means a lot to me...",
  },
];

const MessageCenter = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(styles.messenger)}>
      <div className={styles.container}>
        <Users className={styles.users} items={users} setVisible={setVisible} />
        <Messages
          className={styles.messages}
          visible={visible}
          setVisible={setVisible}
        />
        <Location className={styles.location} />
      </div>
    </div>
  );
};

export default MessageCenter;
