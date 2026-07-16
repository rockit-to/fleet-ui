import React, { useState } from "react";
import cn from "classnames";
import styles from "./List.module.sass";
import Card from "../../../../components/Card";
import Icon from "../../../../components/Icon";
import Slider from "react-slick";
import { useBooking } from "../../../../features/stays";

const locations = [
  {
    title: "Stays",
    list: [
      {
        title: "Entire serviced classy moutain house",
        priceOld: "$356",
        priceActual: "$267",
        categoryText: "superhost",
        rating: "4.8",
        reviews: "12",
        cost: "$200 total",
        src: "/images/content/card-pic-1.jpg",
        srcSet: "/images/content/card-pic-1@2x.jpg",
        url: "/stays-product",
        options: [
          {
            title: "Free wifi",
            icon: "modem",
          },
          {
            title: "Breakfast included",
            icon: "burger",
          },
        ],
      },
      {
        title: "Entire serviced classy moutain house",
        priceOld: "$245",
        priceActual: "$167",
        categoryText: "superhost",
        rating: "4.9",
        reviews: "24",
        cost: "$100 total",
        src: "/images/content/card-pic-2.jpg",
        srcSet: "/images/content/card-pic-2@2x.jpg",
        url: "/stays-product",
        options: [
          {
            title: "Free wifi",
            icon: "modem",
          },
          {
            title: "Breakfast included",
            icon: "burger",
          },
        ],
      },
      {
        title: "Entire serviced classy moutain house",
        priceOld: "$356",
        priceActual: "$267",
        categoryText: "superhost",
        rating: "5.0",
        reviews: "102",
        cost: "$333 total",
        src: "/images/content/card-pic-3.jpg",
        srcSet: "/images/content/card-pic-3@2x.jpg",
        url: "/stays-product",
        options: [
          {
            title: "Free wifi",
            icon: "modem",
          },
          {
            title: "Breakfast included",
            icon: "burger",
          },
        ],
      },
      {
        title: "Entire serviced classy moutain house",
        priceOld: "$156",
        priceActual: "$267",
        categoryText: "superhost",
        rating: "4.5",
        reviews: "5",
        cost: "$230 total",
        src: "/images/content/card-pic-4.jpg",
        srcSet: "/images/content/card-pic-4@2x.jpg",
        url: "/stays-product",
        options: [
          {
            title: "Free wifi",
            icon: "modem",
          },
          {
            title: "Breakfast included",
            icon: "burger",
          },
        ],
      },
    ],
  },
  {
    title: "Experiences",
    list: [
      {
        title: "Entire serviced classy moutain house",
        priceOld: "$245",
        priceActual: "$167",
        categoryText: "superhost",
        rating: "4.9",
        reviews: "24",
        cost: "$100 total",
        src: "/images/content/card-pic-2.jpg",
        srcSet: "/images/content/card-pic-2@2x.jpg",
        url: "/stays-product",
        options: [
          {
            title: "Free wifi",
            icon: "modem",
          },
          {
            title: "Breakfast included",
            icon: "burger",
          },
        ],
      },
      {
        title: "Entire serviced classy moutain house",
        priceOld: "$356",
        priceActual: "$267",
        categoryText: "superhost",
        rating: "5.0",
        reviews: "102",
        cost: "$333 total",
        src: "/images/content/card-pic-3.jpg",
        srcSet: "/images/content/card-pic-3@2x.jpg",
        url: "/stays-product",
        options: [
          {
            title: "Free wifi",
            icon: "modem",
          },
          {
            title: "Breakfast included",
            icon: "burger",
          },
        ],
      },
      {
        title: "Entire serviced classy moutain house",
        priceOld: "$156",
        priceActual: "$267",
        categoryText: "superhost",
        rating: "4.5",
        reviews: "5",
        cost: "$230 total",
        src: "/images/content/card-pic-4.jpg",
        srcSet: "/images/content/card-pic-4@2x.jpg",
        url: "/stays-product",
        options: [
          {
            title: "Free wifi",
            icon: "modem",
          },
          {
            title: "Breakfast included",
            icon: "burger",
          },
        ],
      },
    ],
  },
];

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const List = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { publishedStays } = useBooking();
  const hostLocations = [
    {
      title: "Your stays",
      list: publishedStays.map((stay) => ({ ...stay, url: `/stays-product/${stay.id}` })),
    },
    ...locations,
  ];

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 2,
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
  };

  return (
    <div className={cn(className, styles.list)}>
      <div className={styles.title}>Zoe Towne’s listing</div>
      <div className={styles.nav}>
        {hostLocations.map((x, index) => (
          <button
            className={cn(styles.link, {
              [styles.active]: index === activeIndex,
            })}
            onClick={() => setActiveIndex(index)}
            key={index}
          >
            {x.title}
          </button>
        ))}
      </div>
      <div className={styles.wrapper}>
        {hostLocations[activeIndex].list.length === 0 ? (
          <p>You have not published a stay yet.</p>
        ) : <Slider className="profile-slider" {...settings}>
          {hostLocations[activeIndex].list.map((x, index) => (
            <Card className={styles.card} item={x} key={index} />
          ))}
        </Slider>}
      </div>
    </div>
  );
};

export default List;
