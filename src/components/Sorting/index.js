import React, { useState } from "react";
import cn from "classnames";
import styles from "./Sorting.module.sass";
import Dropdown from "../Dropdown";
import Control from "../Control";
import Icon from "../Icon";

const Sorting = ({
  className,
  urlHome,
  breadcrumbs,
  navigation,
  title,
  sale,
  details,
  info,
  sorting,
  setSorting,
  sortingOptions,
  activeCategory,
  onCategoryChange,
}) => {
  const [internalCategory, setInternalCategory] = useState(navigation[0]);
  const [visibleMap, setVisibleMap] = useState(false);
  const selectedCategory = activeCategory ?? internalCategory;
  const activeIndex = Math.max(0, navigation.indexOf(selectedCategory));

  const selectCategory = (category) => {
    if (activeCategory === undefined) setInternalCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <div className={cn(className, styles.sorting)}>
      <div className={cn("container", styles.container)}>
        <Control
          className={styles.control}
          urlHome={urlHome}
          breadcrumbs={breadcrumbs}
        />
        <div className={styles.body}>
          <div className={styles.box}>
            <div className={cn("h2", styles.title)}>{title}</div>
            {sale && (
              <div className={styles.line}>
                <div className={styles.sale}>{sale}</div>
                <div className={styles.details}>{details}</div>
              </div>
            )}
            {info && <div className={styles.info}>{info}</div>}
          </div>
          <div className={styles.location}>
            <button
              className={cn("button-stroke", styles.button, {
                [styles.active]: visibleMap,
              })}
              onClick={() => setVisibleMap(!visibleMap)}
            >
              <span>Show map</span>
              <Icon name="arrow-bottom" size="12" />
            </button>
            <div className={cn(styles.map, { [styles.show]: visibleMap })}>
              <iframe
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63817.0803287881!2d168.63234961382247!3d-45.04173987887954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa9d51df1d7a8de5f%3A0x500ef868479a600!2z0JrRg9C40L3RgdGC0LDRg9C9LCDQndC-0LLQsNGPINCX0LXQu9Cw0L3QtNC40Y8!5e0!3m2!1sru!2sua!4v1624887132616!5m2!1sru!2sua"
                width="600"
                height="450"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.nav}>
            {navigation.map((x, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: index === activeIndex,
                })}
                onClick={() => selectCategory(x)}
                key={index}
              >
                {x}
              </button>
            ))}
          </div>
          <Dropdown
            className={cn("tablet-show", styles.dropdown)}
            value={selectedCategory}
            setValue={selectCategory}
            options={navigation}
          />
          <Dropdown
            className={styles.dropdown}
            value={sorting}
            setValue={setSorting}
            options={sortingOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Sorting;
