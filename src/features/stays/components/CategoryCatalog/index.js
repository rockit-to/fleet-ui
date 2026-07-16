import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import cn from "classnames";
import styles from "./CategoryCatalog.module.sass";
import Sorting from "../../../../components/Sorting";
import Browse from "../../../../components/Browse";
import Card from "../../../../components/Card";
import Loader from "../../../../components/Loader";
import { useBrowse } from "../../hooks/useBrowse";
import AsyncState from "../AsyncState";
import { useStaysList } from "../../hooks/useStaysList";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Stays",
    url: "/",
  },
  {
    title: "New Zealand",
    url: "/stays-category",
  },
  {
    title: "South Island",
  },
];

const navigation = [
  "Entire homes",
  "Cancellation flexibility",
  "For long stays",
];

const filterOptions = [
  "Entire homes",
  "Cancellation flexibility",
  "For long stays",
];
const sortingOptions = ["Recommended", "Price: low to high", "Price: high to low", "Guest rating"];

function priceOf(stay) {
  return Number(stay.priceActual?.replace(/[^0-9.]/g, "")) || 0;
}

const CategoryCatalog = () => {
  const { data: browseData, loading: browseLoading, error: browseError, reload: reloadBrowse } = useBrowse();
  const { stays, loading, error, reload: reloadStays } = useStaysList();
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(filterOptions[0]);
  const [sorting, setSorting] = useState(sortingOptions[0]);
  const [visibleCount, setVisibleCount] = useState(6);

  const browse2 = browseData?.browse2 ?? [];
  const searchLocation = (searchParams.get("location")?.trim().toLowerCase() ?? "").replace("zeeland", "zealand");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  const filteredStays = useMemo(() => {
    const result = stays.filter((stay) => {
      const locationMatches = !searchLocation || stay.location?.toLowerCase().includes(searchLocation);
      if (!locationMatches) return false;
      if (activeFilter === "Cancellation flexibility") return stay.flexibleCancellation;
      if (activeFilter === "For long stays") return stay.longStayEligible;
      return stay.propertyType === "entire-home";
    });

    return [...result].sort((a, b) => {
      if (sorting === "Price: low to high") return priceOf(a) - priceOf(b);
      if (sorting === "Price: high to low") return priceOf(b) - priceOf(a);
      if (sorting === "Guest rating") return Number(b.rating) - Number(a.rating);
      return 0;
    });
  }, [activeFilter, searchLocation, sorting, stays]);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeFilter, searchLocation, sorting]);

  const searchDetails = [
    checkIn && checkOut ? `${checkIn} – ${checkOut}` : null,
    guests ? `${guests} ${guests === "1" ? "guest" : "guests"}` : null,
  ].filter(Boolean).join(", ") || "Flexible dates, any guests";

  return (
    <div className={cn("section", styles.section)}>
      <Sorting
        className={styles.sorting}
        urlHome="/"
        breadcrumbs={breadcrumbs}
        navigation={navigation}
        title="Places to stay"
        sale={`${filteredStays.length} stays`}
        details={searchDetails}
        sorting={sorting}
        setSorting={setSorting}
        sortingOptions={sortingOptions}
        activeCategory={activeFilter}
        onCategoryChange={setActiveFilter}
      />
      <AsyncState loading={browseLoading} error={browseError} onRetry={reloadBrowse} label="nearby stay ideas" />
      {!browseLoading && !browseError && <Browse
        classSection="section-mb80"
        headSmall
        classTitle="h4"
        title="Explore mountains in New Zealand"
        items={browse2}
      />}
      <div className={styles.body}>
        <div className={cn("container", styles.container)}>
          <h4 className={cn("h4", styles.title)}>{filteredStays.length} matching stays</h4>
          {loading && <p>Loading stays…</p>}
          {error && <><p>We could not load stays. Please try again.</p><button className="button-stroke" type="button" onClick={reloadStays}>Try again</button></>}
          {!loading && !error && filteredStays.length === 0 && (
            <p>No stays match this search. Try another location or filter.</p>
          )}
          <div className={styles.list}>
            {filteredStays.slice(0, visibleCount).map((stay) => (
              <Card
                className={styles.card}
                item={{ ...stay, url: `/stays-product/${stay.id}?${searchParams.toString()}` }}
                key={stay.id}
              />
            ))}
          </div>
          {!loading && visibleCount < filteredStays.length && (
            <div className={styles.btns}>
              <button
                className={cn("button-stroke", styles.button)}
                type="button"
                onClick={() => setVisibleCount((count) => count + 6)}
              >
                <Loader className={styles.loader} />
                <span>Show more</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCatalog;
