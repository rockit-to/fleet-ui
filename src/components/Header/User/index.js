import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import { useSession } from "../../../features/session/SessionContext";

const User = ({ className, items }) => {
    const [visible, setVisible] = useState(false);
    const { pathname } = useLocation();
    const { logout } = useSession();

    return (
        <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
            <div
                className={cn(styles.user, className, {
                    [styles.active]: visible,
                })}
            >
                <button
                    className={styles.head}
                    onClick={() => setVisible(!visible)}
                >
                    <img src="/images/content/avatar-2.jpg" alt="Avatar" />
                </button>
                <div className={styles.body}>
                    <div className={styles.group}>
                        {items.map((item, index) => (
                            <div className={styles.menu} key={index}>
                                {item.menu.map((x, index) => (
                                    <NavLink
                                        className={cn(styles.item, {
                                            [styles.active]: pathname === x.url,
                                        })}
                                        to={x.url}
                                        onClick={() => setVisible(!visible)}
                                        key={index}
                                    >
                                        <div className={styles.icon}>
                                            <Icon name={x.icon} size="24" />
                                        </div>
                                        <div className={styles.text}>
                                            {x.title}
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className={styles.btns}>
                        <NavLink
                            className={cn(
                                "button button-small",
                                styles.button,
                                {
                                    [styles.active]:
                                        pathname === "/account-settings",
                                }
                            )}
                            to="/account-settings"
                            onClick={() => setVisible(!visible)}
                        >
                            Account
                        </NavLink>
                        <button
                            className={cn(
                                "button-stroke button-small",
                                styles.button
                            )}
                            onClick={logout}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default User;
