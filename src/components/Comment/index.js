import React, { useState } from "react";
import cn from "classnames";
import styles from "./Comment.module.sass";
import Form from "./Form";
import List from "./List";

const Comment = ({ className }) => {
    const [comment, setComment] = useState("");

    return (
        <div className={cn(className, styles.section)}>
            <Form
                className={styles.form}
                value={comment}
                setValue={(e) => setComment(e.target.value)}
                onSubmit={() => console.log("Submit")}
            />
            <List />
        </div>
    );
};

export default Comment;
