import React from "react";
import Newsletter from "../../components/Newsletter";
import Best from "../../components/Best";
import Testimonials from "../../components/Testimonials";
import {
  StaysCategoryMain as CategoryMain,
  StaysCategoryCatalog as CategoryCatalog,
} from "../../features/stays";

const StaysCategoryPage = () => {
  return (
    <>
      <CategoryMain />
      <CategoryCatalog />
      <Newsletter />
      <Best
        classSection="section-mb0"
        title="Superhost"
        info="300+ superhost"
      />
      <Testimonials classSection="section-pd section-mb0" />
    </>
  );
};

export default StaysCategoryPage;
