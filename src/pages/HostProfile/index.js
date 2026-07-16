import React from "react";
import Main from "./Main";
import Best from "../../components/Best";
import Testimonials from "../../components/Testimonials";

const HostProfile = () => {
    return (
        <>
            <Main />
            <Best
                classSection="section-mb0"
                title="Fleet’s super hosts"
                info="You may also like"
            />
            <Testimonials classSection="section-pd section-mb0" />
        </>
    );
};

export default HostProfile;
