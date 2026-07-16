import React from "react";
import Main from "./Main";
import Places from "../../components/Places";
import Newsletter from "../../components/Newsletter";

const Wishlists = () => {
  return (
    <>
      <Main />
      <Places
        classSection="section-mb80"
        title="Explore nearby"
        info="10,789 beautiful places to go"
      />
      <Newsletter />
    </>
  );
};

export default Wishlists;
