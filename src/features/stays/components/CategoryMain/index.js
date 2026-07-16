import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import cn from "classnames";
import styles from "./CategoryMain.module.sass";
import Panel from "../../../../components/Panel";
import Location from "../../../../components/Location";
import DateRange from "../../../../components/DateRange";
import Travelers from "../../../../components/Travelers";

const CategoryMain = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [location, setLocation] = React.useState(searchParams.get("location") ?? "");
  const [dates, setDates] = React.useState({ startDate: null, endDate: null });
  const [travelers, setTravelers] = React.useState({
    adults: Number(searchParams.get("guests")) || 0,
    children: 0,
    babies: 0,
  });
  const search = () => {
    const params = new URLSearchParams(searchParams);
    if (location.trim()) params.set("location", location.trim()); else params.delete("location");
    if (dates.startDate) params.set("checkIn", dates.startDate.format("YYYY-MM-DD"));
    if (dates.endDate) params.set("checkOut", dates.endDate.format("YYYY-MM-DD"));
    const guests = travelers.adults + travelers.children + travelers.babies;
    if (guests) params.set("guests", String(guests)); else params.delete("guests");
    navigate(`/stays-category?${params.toString()}`);
  };

  return (
    <div className={cn("section-mb80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.preview}>
          <img src="/images/content/main-pic-2.jpg" alt="Main" />
          <div className={styles.wrap}>
            <h1 className={cn("hero", styles.title)}>South Island</h1>
            <div className={cn("info", styles.info)}>
              <span role="img" aria-label="Flag New Zealand">
                🇳🇿
              </span>{" "}
              New Zealand
            </div>
          </div>
        </div>
        <Panel
          className={styles.panel}
          classBody={styles.body}
          onSearch={search}
        >
          <div className={styles.row}>
            <Location
              className={styles.location}
              icon="location"
              placeholder="Location"
              small
              value={location}
              onChange={setLocation}
            />
            <DateRange
              className={styles.date}
              icon="calendar"
              startDatePlaceholderText="Check in"
              endDatePlaceholderText="Check out"
              displayFormat="MMM DD"
              small
              startDate={dates.startDate}
              endDate={dates.endDate}
              onDatesChange={setDates}
            />
            <Travelers
              className={styles.travelers}
              title="Travelers"
              icon="user"
              small
              value={travelers}
              onChange={setTravelers}
            />
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default CategoryMain;
