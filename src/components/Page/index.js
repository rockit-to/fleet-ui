import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";

const Page = ({
    separatorHeader,
    children,
    fooferHide,
    wide,
    notAuthorized,
}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        clearAllBodyScrollLocks();
    }, [pathname]);

    return (
        <>
            <div className={styles.page}>
                <Header
                    separatorHeader={separatorHeader}
                    wide={wide}
                    notAuthorized={notAuthorized}
                />
                <div className={styles.inner}>{children}</div>
                {!fooferHide && <Footer />}
            </div>
        </>
    );
};

export default Page;
