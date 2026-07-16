import React, { useState } from "react";
import cn from "classnames";
import styles from "./Interest.module.sass";
import Slider from "react-slick";
import Card from "../Card";
import Icon from "../Icon";
import Dropdown from "../Dropdown";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Interest = ({ classSection, items }) => {
  const sortingOptions = [];
  items.map((x) => sortingOptions.push(x.title));

  const [sorting, setSorting] = useState(sortingOptions[0]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <div className={styles.category}>up to 25% off</div>
          <div className={cn("h2", styles.title)}>You may interested in</div>
          <div className={styles.nav}>
            {items.map((x, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: x.title === sorting,
                })}
                onClick={() => setSorting(x.title)}
                key={index}
              >
                {x.title}
              </button>
            ))}
          </div>
          <div className={cn("mobile-show", styles.box)}>
            <Dropdown
              className={styles.dropdown}
              value={sorting}
              setValue={setSorting}
              options={sortingOptions}
            />
          </div>
        </div>
        <div className={styles.wrapper}>
          <Slider className="interest-slider" {...settings}>
            {items
              .find((x) => x.title === sorting)
              .items.map((x, index) => (
                <Card className={styles.card} item={x} key={index} />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Interest;
