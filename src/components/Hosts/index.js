import React, { useState } from "react";
import cn from "classnames";
import styles from "./Hosts.module.sass";
import Slider from "react-slick";
import Item from "./Item";
import Icon from "../Icon";
import DropdownEmpty from "../DropdownEmpty";

const items = [
  {
    title: "Antone Heller",
    location: "Gaylordside",
    avatar: "/images/content/host-avatar-1.jpg",
    rating: "4.9",
    src: "/images/content/host-pic-1.jpg",
    srcSet: "/images/content/host-pic-1@2x.jpg",
    url: "/host-profile",
  },
  {
    title: "Antone Heller",
    location: "Gaylordside",
    avatar: "/images/content/host-avatar-2.jpg",
    rating: "4.8",
    src: "/images/content/host-pic-2.jpg",
    srcSet: "/images/content/host-pic-2@2x.jpg",
    url: "/host-profile",
  },
  {
    title: "Antone Heller",
    location: "Gaylordside",
    avatar: "/images/content/host-avatar-3.jpg",
    rating: "5.0",
    src: "/images/content/host-pic-3.jpg",
    srcSet: "/images/content/host-pic-3@2x.jpg",
    url: "/host-profile",
  },
  {
    title: "Antone Heller",
    location: "Gaylordside",
    avatar: "/images/content/host-avatar-4.jpg",
    rating: "4.9",
    src: "/images/content/host-pic-4.jpg",
    srcSet: "/images/content/host-pic-4@2x.jpg",
    url: "/host-profile",
  },
  {
    title: "Antone Heller",
    location: "Gaylordside",
    avatar: "/images/content/host-avatar-1.jpg",
    rating: "4.9",
    src: "/images/content/host-pic-1.jpg",
    srcSet: "/images/content/host-pic-1@2x.jpg",
    url: "/host-profile",
  },
  {
    title: "Antone Heller",
    location: "Gaylordside",
    avatar: "/images/content/host-avatar-2.jpg",
    rating: "4.8",
    src: "/images/content/host-pic-2.jpg",
    srcSet: "/images/content/host-pic-2@2x.jpg",
    url: "/host-profile",
  },
];

const dateOptions = ["month", "day", "year"];

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Hosts = ({ classSection }) => {
  const [date, setDate] = useState(dateOptions[0]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
        breakpoint: 1179,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className={cn("section", classSection, styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <h2 className={cn("h2", styles.title)}>Best hosts of the </h2>
            <DropdownEmpty
              className={styles.dropdown}
              value={date}
              setValue={setDate}
              options={dateOptions}
            />
          </div>
          <div className={styles.wrapper}>
            <Slider className="hosts-slider" {...settings}>
              {items.map((x, index) => (
                <Item className={styles.item} item={x} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hosts;
