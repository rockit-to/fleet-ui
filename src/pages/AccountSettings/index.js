import React, { useState } from "react";
import cn from "classnames";
import styles from "./AccountSettings.module.sass";
import Icon from "../../components/Icon";
import Dropdown from "../../components/Dropdown";
import PersonalInfo from "./PersonalInfo";
import LoginAndSecurity from "./LoginAndSecurity";
import PaymentsMethod from "./PaymentsMethod";
import NotificationSetting from "./NotificationSetting";

const items = [
  {
    title: "Personal info",
    icon: "user",
  },
  {
    title: "Login and security",
    icon: "lock",
  },
  {
    title: "Payments",
    icon: "credit-card",
  },
  {
    title: "Notification",
    icon: "bell",
  },
];

const AccountSettings = () => {
  const options = [];
  items.map((x) => options.push(x.title));

  const [activeTab, setActiveTab] = useState(options[0]);

  const handleClick = (x) => {
    setActiveTab(x.title);
  };

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <Dropdown
          className={cn("tablet-show", styles.dropdown)}
          options={options}
          value={activeTab}
          setValue={setActiveTab}
        />
        <div className={styles.menu}>
          {items.map((x, index) => (
            <button
              className={cn(styles.link, {
                [styles.active]: x.title === activeTab,
              })}
              onClick={() => handleClick(x, index)}
              key={index}
            >
              <Icon name={x.icon} size="16" />
              {x.title}
            </button>
          ))}
        </div>
        <div className={styles.wrapper}>
          {activeTab === options[0] && <PersonalInfo />}
          {activeTab === options[1] && <LoginAndSecurity />}
          {activeTab === options[2] && <PaymentsMethod />}
          {activeTab === options[3] && <NotificationSetting />}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
