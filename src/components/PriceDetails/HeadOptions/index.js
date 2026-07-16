import React from "react";
import cn from "classnames";
import styles from "./HeadOptions.module.sass";

const HeadOptions = ({ className, image, title }) => {
    return (
        <div className={cn(className, styles.head)}>
            <div className={styles.preview}>
                <img src={image} alt="Nature" />
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.author}>
                <div className={styles.text}>Hosted by</div>
                <div className={styles.avatar}>
                    <img src="/images/content/avatar.jpg" alt="Avatar" />
                </div>
                <div className={styles.man}>Zoe Towne</div>
            </div>
        </div>
    );
};

export default HeadOptions;
