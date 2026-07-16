import cn from "classnames";
import styles from "./Actions.module.sass";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import Map from "../Map";
import Share from "../Share";
import Favorite from "../Favorite";

const Actions = ({ className }) => {
    return (
        <div className={cn(className, styles.actions)}>
            <div className={styles.list}>
                <Map />
                <Share />
                <Favorite className={styles.favorite} />
                <Link
                    className={cn(
                        "button-circle-stroke button-small",
                        styles.button
                    )}
                    to="/stays-category"
                >
                    <Icon name="close" size="24" />
                </Link>
            </div>
        </div>
    );
};

export default Actions;
