import React, { useState } from "react";
import cn from "classnames";
import styles from "./List.module.sass";
import Rating from "../../Rating";
import Dropdown from "../../Dropdown";
import Loader from "../../Loader";

const items = [
  {
    author: "Myrtie Runolfsson",
    avatar: "/images/content/avatar-1.jpg",
    rating: "5",
    time: "about 1 hour ago",
    content:
      "We had the most spectacular view. Unfortunately it was very hot in the room from 2-830 pm due to no air conditioning and no shade.",
  },
  {
    author: "Osbaldo Beahan",
    avatar: "/images/content/avatar-2.jpg",
    rating: "5",
    time: "about 1 hour ago",
    content:
      "Stunning views of Queenstown. Very peaceful. Love it so much. Definitely gonna come back and visit.",
  },
  {
    author: "Tobin Hackett",
    avatar: "/images/content/avatar-3.jpg",
    rating: "5",
    time: "1 day ago",
    content: "Best place I stayed in all of NZ. 🙌 🎉 😎",
  },
];

const dateOptions = ["Newest", "Popular"];

const List = () => {
  const [date, setDate] = useState(dateOptions[0]);

  return (
    <div className={styles.list}>
      <div className={styles.head}>
        <div className={styles.title}>3 comments</div>
        <Dropdown
          className={styles.dropdown}
          value={date}
          setValue={setDate}
          options={dateOptions}
        />
      </div>
      <div className={styles.group}>
        {items.map((x, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.avatar}>
              <img src={x.avatar} alt="Avatar" />
            </div>
            <div className={styles.details}>
              <div className={styles.top}>
                <div className={styles.author}>{x.author}</div>
                <Rating
                  className={styles.rating}
                  readonly
                  initialRating={x.rating}
                />
              </div>
              <div className={styles.content}>{x.content}</div>
              <div className={styles.foot}>
                <div className={styles.time}>{x.time}</div>
                <div className={styles.actions}>
                  <button className={styles.action}>Like</button>
                  <button className={styles.action}>Reply</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.btns}>
        <button className={cn("button-stroke button-small", styles.button)}>
          <Loader className={styles.loader} />
          <span>Loading comment</span>
        </button>
      </div>
    </div>
  );
};

export default List;
