import React, { useState } from "react";
import cn from "classnames";
import styles from "./Users.module.sass";
import Icon from "../../../components/Icon";
import Item from "./Item";

const Users = ({ className, items, setVisible }) => {
  const [activeId, setActiveId] = useState(items[0].id);

  return (
    <div className={cn(className, styles.users)}>
      <button className={styles.toggle}>
        <Icon name="arrow-prev" size="24" />
        Messages center
      </button>
      <div className={styles.list}>
        {items.map((x, index) => (
          <Item
            item={x}
            activeId={activeId}
            setActiveId={setActiveId}
            setVisible={setVisible}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
