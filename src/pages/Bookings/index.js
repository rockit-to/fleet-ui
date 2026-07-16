import React, { useState, useEffect } from "react";
import Main from "./Main";
import Browse from "../../components/Browse";
import Categories from "../../components/Categories";

const Bookings = () => {
  const [browse1, setBrowse1] = useState([]);
  const [categories1, setCategories1] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/fleet/browse`)
      .then((res) => res.json())
      .then((data) => setBrowse1(data.browse1));
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/fleet/categories`)
      .then((res) => res.json())
      .then((data) => setCategories1(data.categories1));
  }, []);

  return (
    <>
      <Main />
      <Browse
        classSection="section"
        classTitle="h2"
        title="You may also like"
        info="Let’s go on an adventure"
        items={browse1}
      />
      <Categories
        classSection="section"
        title="Browse by category"
        info="Let’s go on an adventure"
        items={categories1}
      />
    </>
  );
};

export default Bookings;
