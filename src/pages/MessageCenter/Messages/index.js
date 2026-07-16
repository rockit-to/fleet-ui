import React, { useState } from "react";
import cn from "classnames";
import styles from "./Messages.module.sass";
import Form from "../../../components/Form";
import Icon from "../../../components/Icon";
import { useBooking } from "../../../features/stays";

const Messages = ({ className, visible, setVisible }) => {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, booking } = useBooking();

  const handleSubmit = (e) => {
    if (message.trim()) { sendMessage(message.trim()); setMessage(""); }
  };
  return (
    <div className={cn(className, styles.messages, { [styles.show]: visible })}>
      <div className={styles.wrapper}>
        <button className={styles.back} onClick={() => setVisible(false)}>
          <Icon name="arrow-prev" size="24" />
          Host
        </button>
        <div className={styles.date}>May 12, 2021</div>
        <div className={styles.list}>
          <div className={styles.author}>
            <div className={styles.avatar}>
              <img src="/images/content/avatar-1.jpg" alt="Avatar" />
            </div>
            <div className={styles.message}>
              Described by Queenstown House & Garden magazine as having 'one of
              the best views we've ever seen' you will love... 😊
            </div>
          </div>
          <div className={styles.time}>7:37 PM</div>
          <div className={styles.message}>Hello, how are you doing?</div>
          <div className={styles.message}>I would like to ask something.</div>
          <div className={styles.author}>
            <div className={styles.avatar}>
              <img src="/images/content/avatar-1.jpg" alt="Avatar" />
            </div>
          <div className={styles.message}>Hi John, how are you?</div>
          {booking?.stay && <div className={styles.message}>I have a question about {booking.stay.title}.</div>}
          {messages.map((item) => <div className={styles.message} key={item.id}>{item.text}</div>)}
          </div>
        </div>
      </div>
      <Form
        className={styles.form}
        value={message}
        setValue={setMessage}
        onSubmit={() => handleSubmit()}
        placeholder="Enter something"
        type="text"
        name="message"
        icon="arrow-next"
      />
    </div>
  );
};

export default Messages;
