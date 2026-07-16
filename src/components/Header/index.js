import React, { useState } from "react";
import cn from "classnames";
import styles from "./Header.module.sass";
import { Link, NavLink, useLocation } from "react-router-dom";
import Image from "../Image";
import Dropdown from "./Dropdown";
import Language from "./Language";
import Notification from "./Notification";
import User from "./User";
import Icon from "../Icon";
import Modal from "../Modal";
import Login from "../Login";
import { useSession } from "../../features/session/SessionContext";

const travelers = [
    {
        title: "Stays",
        url: "/",
        icon: "comment",
    },
    {
        title: "Flights",
        url: "/flights",
        icon: "email",
        disabled: true,
    },
    {
        title: "Things to do",
        url: "/things-to-do",
        icon: "home",
        disabled: true,
    },
    {
        title: "Cars",
        url: "/cars",
        icon: "email",
        disabled: true,
    },
];

const languages = [
    {
        title: "English",
        country: "United States",
        url: "/",
    },
    {
        title: "Vietnamese",
        country: "Vietnamese",
        url: "/",
    },
    {
        title: "Français",
        country: "Belgique",
        url: "/",
    },
    {
        title: "Français",
        country: "Canada",
        url: "/",
    },
];

const items = [
    {
        menu: [
            {
                title: "Messages",
                icon: "comment",
                url: "/messages",
            },
            {
                title: "Bookings",
                icon: "home",
                url: "/bookings",
            },
            {
                title: "Wishlists",
                icon: "email",
                url: "/wishlists",
            },
        ],
    },
    {
        menu: [
            {
                title: "List your property",
                icon: "building",
                url: "/list-your-property",
            },
            {
                title: "Host an experience",
                icon: "flag",
                url: "/your-trips",
            },
        ],
    },
];

const Header = ({ separatorHeader, wide, notAuthorized }) => {
    const [visibleNav, setVisibleNav] = useState(false);
    const [visible, setVisible] = useState(false);
    const { pathname } = useLocation();
    const { user } = useSession();

    return (
        <>
            <div
                className={cn(
                    styles.header,
                    { [styles.headerBorder]: separatorHeader },
                    { [styles.wide]: wide }
                )}
            >
                <div className={cn("container", styles.container)}>
                    <Link className={styles.logo} to="/">
                        <Image
                            className={styles.pic}
                            src="/images/logo-dark.svg"
                            srcDark="/images/logo-light.svg"
                            alt="Fleet"
                        />
                    </Link>
                    <div
                        className={cn(styles.wrapper, {
                            [styles.active]: visibleNav,
                        })}
                    >
                        <Dropdown
                            className={styles.drowdown}
                            items={travelers}
                            setValue={setVisibleNav}
                        />
                        <NavLink
                            className={cn(styles.link, {
                                [styles.active]: pathname === "/support",
                            })}
                            to="/support"
                        >
                            Support
                        </NavLink>
                        <Language
                            className={styles.language}
                            items={languages}
                        />
                        <NavLink
                            className={cn(
                                "button-stroke button-small",
                                styles.button,
                                {
                                    [styles.active]:
                                        pathname === "/list-your-property",
                                }
                            )}
                            to="/list-your-property"
                        >
                            List your property
                        </NavLink>
                    </div>
                    <Notification className={styles.notification} />
                    {notAuthorized || !user.loggedIn ? (
                        <button
                            className={styles.login}
                            onClick={() => setVisible(true)}
                        >
                            <Icon name="user" size="24" />
                        </button>
                    ) : (
                        <User className={styles.user} items={items} />
                    )}
                    <button
                        className={cn(styles.burger, {
                            [styles.active]: visibleNav,
                        })}
                        onClick={() => setVisibleNav(!visibleNav)}
                    ></button>
                </div>
            </div>
            <Modal visible={visible} onClose={() => setVisible(false)}>
                <Login onSuccess={() => setVisible(false)} />
            </Modal>
        </>
    );
};

export default Header;
