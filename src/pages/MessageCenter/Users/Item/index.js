import cn from "classnames";
import styles from "./Item.module.sass";
import Icon from "../../../../components/Icon";

const Item = ({ item, setVisible, activeId, setActiveId }) => {
  const handleClick = (id) => {
    setVisible(true);
    setActiveId(id);
  };

  return (
    <div
      className={cn(styles.item, { [styles.active]: activeId === item.id })}
      onClick={() => handleClick(item.id)}
    >
      <div className={styles.avatar}>
        <img src={item.avatar} alt="Avatar" />
      </div>
      <div className={styles.details}>
        <div className={styles.head}>
          <div className={styles.man}>{item.man}</div>
          <div className={styles.rating}>
            <Icon name="star" size="12" />
            {item.rating}
          </div>
        </div>
        <div className={styles.date}>{item.date}</div>
        <div className={styles.message}>{item.message}</div>
      </div>
    </div>
  );
};

export default Item;
