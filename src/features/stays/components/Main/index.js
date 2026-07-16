import React from "react";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.sass";
import Panel from "../../../../components/Panel";
import Location from "../../../../components/Location";
import DateRange from "../../../../components/DateRange";
import Travelers from "../../../../components/Travelers";

const Main = () => {
  const navigate = useNavigate();
  const [location, setLocation] = React.useState("");
  const [dates, setDates] = React.useState({ startDate: null, endDate: null });
  const [travelers, setTravelers] = React.useState({ adults: 0, children: 0, babies: 0 });

  const search = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (dates.startDate) params.set("checkIn", dates.startDate.format("YYYY-MM-DD"));
    if (dates.endDate) params.set("checkOut", dates.endDate.format("YYYY-MM-DD"));
    const guests = travelers.adults + travelers.children + travelers.babies;
    if (guests) params.set("guests", String(guests));
    navigate(`/stays-category${params.size ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.preview}>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/images/content/main-pic-mobile-1.jpg"
            />
            <img src="/images/content/main-pic-1.jpg" alt="Main" />
          </picture>
          <div className={styles.wrap}>
            <h1 className={cn("hero", styles.title)}>Air, sleep, dream</h1>
            <div className={cn("info", styles.info)}>
              Find and book a great experience.
            </div>
          <button className={cn("button", styles.button)} type="button" onClick={search}>
            Start your search
          </button>
          </div>
        </div>
        <Panel
          className={styles.panel}
          menu
          classBody={styles.body}
          onSearch={search}
        >
          <div className={styles.row}>
            <Location
              className={styles.location}
              icon="location"
              description="Where are you going?"
              placeholder="Location"
              value={location}
              onChange={setLocation}
            />
            <DateRange
              className={styles.date}
              icon="calendar"
              description="Add date"
              startDatePlaceholderText="Check in"
              endDatePlaceholderText="Check out"
              displayFormat="MMM DD, YYYY"
              startDate={dates.startDate}
              endDate={dates.endDate}
              onDatesChange={setDates}
            />
            <Travelers
              className={styles.travelers}
              title="Travelers"
              description="Add guests"
              icon="user"
              value={travelers}
              onChange={setTravelers}
            />
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default Main;
