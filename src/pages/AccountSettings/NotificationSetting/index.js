import React, { useState } from "react";
import cn from "classnames";
import styles from "./NotificationSetting.module.sass";
import Switch from "../../../components/Switch";

const settings = [
  {
    title: "Messages",
    items: [
      {
        id: 0,
        title: "Email",
        content: "Recevice notifications via email",
      },
      {
        id: 1,
        title: "Text messages",
        content: "Recevice notifications via mobile phone",
      },
      {
        id: 2,
        title: "Browser notifications",
        content: "Recevice notifications of your browser",
      },
    ],
  },
  {
    title: "Promotions",
    items: [
      {
        id: 4,
        title: "Email",
        content: "Recevice notifications via email",
      },
      {
        id: 5,
        title: "Text messages",
        content: "Recevice notifications via mobile phone",
      },
      {
        id: 6,
        title: "Browser notifications",
        content: "Recevice notifications of your browser",
      },
    ],
  },
  {
    title: "Reminders",
    items: [
      {
        id: 7,
        title: "Email",
        content: "Recevice notifications via email",
      },
      {
        id: 8,
        title: "Text messages",
        content: "Recevice notifications via mobile phone",
      },
      {
        id: 9,
        title: "Browser notifications",
        content: "Recevice notifications of your browser",
      },
    ],
  },
];

const NotificationSetting = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  return (
    <div className={styles.section}>
      <div className={cn("h2", styles.title)}>Notification setting</div>
      <div className={styles.list}>
        {settings.map((x, index) => (
          <div className={styles.box} key={index}>
            <div className={styles.category}>{x.title}</div>
            <div className={styles.group}>
              {x.items.map((item, index) => (
                <div className={styles.item} key={index}>
                  <div className={styles.head}>
                    <div className={styles.subtitle}>{item.title}</div>
                    <Switch
                      className={styles.switch}
                      value={selectedFilters.includes(item.id)}
                      onChange={() => handleChange(item.id)}
                    />
                  </div>
                  <div className={styles.content}>{item.content}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSetting;
