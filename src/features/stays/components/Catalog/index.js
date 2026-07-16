import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Catalog.module.sass";
import Icon from "../../../../components/Icon";
import Dropdown from "../../../../components/Dropdown";
import StaysCard from "../StaysCard";
import { useCatalog } from "../../hooks/useCatalog";
import { useStaysList } from "../../hooks/useStaysList";

const dateOptions = ["Recommended", "Price: low to high", "Price: high to low"];

const Catalog = () => {
  const { catalog: catalogList, loading: catalogLoading, error: catalogError, reload: reloadCatalog } = useCatalog();
  const { stays, loading: staysLoading, error: staysError, reload: reloadStays } = useStaysList();
  const [date, setDate] = useState(dateOptions[0]);
  const [sorting, setSorting] = useState(null);

  const activeSorting = sorting ?? catalogList[0]?.title ?? null;
  const sortingOptions = catalogList.map((x) => x.title);
  const items = catalogList.find((x) => x.title === activeSorting)?.items ?? [];
  const price = (item) => Number(item.priceActual?.replace(/[^0-9.]/g, "")) || 0;
  const visibleItems = [...items].sort((a, b) => {
    if (date === "Price: low to high") return price(a) - price(b);
    if (date === "Price: high to low") return price(b) - price(a);
    return 0;
  });

  if (catalogLoading || staysLoading) {
    return <div className="section"><div className="container">Loading featured stays…</div></div>;
  }
  if (catalogError || staysError) {
    return <div className="section"><div className="container"><p>We could not load featured stays.</p><button className="button-stroke" type="button" onClick={() => { reloadCatalog(); reloadStays(); }}>Try again</button></div></div>;
  }
  if (!catalogList.length || !stays.length) {
    return <div className="section"><div className="container">No featured stays are available right now.</div></div>;
  }

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrapper}>
          <h2 className={cn("h2", styles.title)}>Go somewhere</h2>
          <div className={cn("info", styles.info)}>
            Let’s go on an adventure
          </div>
          <div className={styles.sorting}>
            <div className={styles.nav}>
              {catalogList.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: x.title === activeSorting,
                  })}
                  onClick={() => setSorting(x.title)}
                  key={index}
                >
                  <Icon name={x.icon} size="16" />
                  {x.title}
                </button>
              ))}
            </div>
            <div className={cn("tablet-show", styles.box)}>
              <Dropdown
                className={styles.dropdown}
                value={activeSorting}
                setValue={setSorting}
                options={sortingOptions}
              />
            </div>
            <div className={styles.box}>
              <Dropdown
                className={styles.dropdown}
                value={date}
                setValue={setDate}
                options={dateOptions}
              />
            </div>
          </div>
          <div className={styles.list}>
            {visibleItems.map((item, index) => {
              const stay = stays[index % stays.length];
              return (
                <StaysCard
                  className={styles.card}
                  item={{ ...item, url: `/stays-product/${stay.id}`, id: stay.id }}
                  key={`${activeSorting}-${index}`}
                />
              )
            })}
          </div>
          <div className={styles.btns}>
            <Link className={cn("button-stroke button-small", styles.button)} to="/stays-category">
              View all
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
